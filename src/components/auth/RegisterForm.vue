<template>
  <div class="form-container">
    <Form
      v-slot="$credentials"
      class="flex flex-col gap-4"
      :validate-on-submit="true"
      :validate-on-value-update="false"
      :resolver="resolver"
      @submit="onSubmit"
    >
      <Divider>
        <h1 class="text-3xl text-center font-semibold text-slate-200 mb-2">
          {{ $t(`views.auth.title.registerForm`) }}
        </h1>
      </Divider>
      <div class="flex flex-col gap-1">
        <InputText
          name="email"
          :placeholder="$t('views.auth.fields.email')"
          size="large"
          fluid
        />
        <Message
          v-if="$credentials.email?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $credentials.email.error?.message }}</Message
        >
      </div>
      <div class="flex flex-col gap-1">
        <InputText
          name="username"
          :placeholder="$t('views.auth.fields.username')"
          size="large"
          fluid
        />
        <Message
          v-if="$credentials.username?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $credentials.username.error?.message }}</Message
        >
      </div>
      <div class="flex flex-col gap-1">
        <Password
          name="password"
          :placeholder="$t('views.auth.fields.password')"
          size="large"
          :feedback="false"
          fluid
          toggle-mask
        />
        <Message
          v-if="$credentials.password?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $credentials.password.error?.message }}</Message
        >
        <div class="mt-1 flex justify-between">
          <span class="link">
            <router-link :to="{ name: 'login' }">
              {{ $t(`views.auth.messages.alreadyHasAccount`) }}
            </router-link>
          </span>
          <span class="link">
            <router-link :to="{ name: 'home' }">
              {{ $t(`views.auth.messages.backToHome`) }}
            </router-link>
          </span>
        </div>
      </div>
      <Message v-if="error" size="small" variant="simple" severity="error">
        {{ errorMessage }}
      </Message>

      <basic-button type="submit" class="w-full" block>
        {{ $t(`views.auth.buttons.register`) }}
      </basic-button>
    </Form>
  </div>
</template>

<script>
import AuthValidator from "@/validators/AuthValidator"
import { yupResolver } from "@primevue/forms/resolvers/yup"
export default {
  name: "RegisterForm",
  data() {
    return {
      resolver: yupResolver(AuthValidator.registerSchema),
      error: null,
    }
  },
  methods: {
    onSubmit({ valid, values }) {
      if (valid) {
        this.$emit("form-submit", { data: values, form: "register" })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import url("@/assets/style/components/auth/form.scss");
</style>

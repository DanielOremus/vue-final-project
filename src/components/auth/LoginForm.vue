<template>
  <Form
    v-slot="$credentials"
    class="flex flex-col gap-4"
    :validate-on-submit="true"
    :validate-on-value-update="false"
    :resolver="validator"
    @submit="onSubmit"
  >
    <Divider :pt="{ content: 'bg-transparent' }">
      <h1 class="text-3xl text-center font-semibold text-slate-200 mb-2">
        {{ $t(`views.auth.title.loginForm`) }}
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
        name="password"
        type="password"
        :placeholder="$t('views.auth.fields.password')"
        size="large"
        fluid
      />
      <Message
        v-if="$credentials.password?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $credentials.password.error?.message }}</Message
      >
      <div class="mt-1">
        <span class="account-link">
          <router-link :to="{ name: 'register' }">
            {{ $t(`views.auth.messages.noAccountYet`) }}
          </router-link>
        </span>
      </div>
    </div>
    <Message v-if="error" size="small" variant="simple" severity="error">
      {{ errorMessage }}
    </Message>
    <BasicButton type="submit" block>
      {{ $t(`views.auth.buttons.login`) }}
    </BasicButton>
  </Form>
</template>

<script>
export default {
  name: "LoginForm",
}
</script>

<style lang="css" scoped></style>

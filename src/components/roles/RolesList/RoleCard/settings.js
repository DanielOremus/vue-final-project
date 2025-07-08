import { clientPermissionsConfig } from "peaker-perm-config"

const getDefaultRoleTemplate = () => {
  const role = {
    name: "",
    permissions: {},
  }
  for (const page in clientPermissionsConfig) {
    role.permissions[page] = {}
    for (const perm of clientPermissionsConfig[page]) {
      role.permissions[page][perm] = false
    }
  }
  return role
}

export const roleTemplate = getDefaultRoleTemplate()

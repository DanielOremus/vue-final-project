import { config as permsConfig } from "peaker-perm-config"

const getDefaultRoleTemplate = () => {
  const role = {
    name: "",
    permissions: {},
  }
  for (const page in permsConfig) {
    role.permissions[page] = {}
    for (const perm of permsConfig[page]) {
      role.permissions[page][perm] = false
    }
  }
  return role
}

export const roleTemplate = getDefaultRoleTemplate()

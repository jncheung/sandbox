/**
 * ListOrganisation GraphQL query
 */
module.exports = `query MyQuery($orgID: ID) {
  listOrganisations(orgID: $orgID) {
    items {
      orgID
    }
  }
}
`
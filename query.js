/**
 * ListOrganisation GraphQL query
 */
module.exports = `query ListOrganisations(
    $orgID: ID!
    $sortKey: ModelIDKeyConditionInput
    $filter: ModelOrganisationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
) {
    duplicated: listOrganisations(
    orgID: $orgID
    sortKey: $sortKey
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    ) {
    items {
        userID
    }
    nextToken
    }

    queryOrgInfo: getOrganisation(
        orgID: $orgID
        sortKey: "INFO"
    ) {
        orgID
        orgName
    }
}
`
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrganisation = /* GraphQL */ `
  query GetOrganisation($orgID: ID!, $sortKey: ID!) {
    getOrganisation(orgID: $orgID, sortKey: $sortKey) {
      id
      orgID
      sortKey
      itemType
      orgName
      logo {
        bucket
        key
        region
        localUri
        mimeType
        updatedAt
      }
      country
      orgSize
      industry
      website
      deptID
      deptName
      locationID
      locationName
      userID
      userSK
      memberID
      employeeID
      SDBAccessToken
      SDBAdminChannel
      role
      deactivatedAt
      deactivatedBy
      createdAt
      createdBy
      updatedAt
      updatedBy
      isDeleted
      deletedAt
      deletedBy
      TTL
      user {
        id
        userID
        sortKey
        itemType
        phoneNumber
        firstName
        lastName
        avatar {
          bucket
          key
          region
          localUri
          mimeType
          updatedAt
        }
        createdAt
        createdBy
        updatedAt
        updatedBy
        isDeleted
        deletedAt
        deletedBy
        SDBAccessToken
      }
    }
  }
`;
export const listOrganisations = /* GraphQL */ `
  query ListOrganisations(
    $orgID: ID
    $sortKey: ModelIDKeyConditionInput
    $filter: ModelOrganisationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOrganisations(
      orgID: $orgID
      sortKey: $sortKey
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        orgID
        sortKey
        itemType
        orgName
        logo {
          bucket
          key
          region
          localUri
          mimeType
          updatedAt
        }
        country
        orgSize
        industry
        website
        deptID
        deptName
        locationID
        locationName
        userID
        userSK
        memberID
        employeeID
        SDBAccessToken
        SDBAdminChannel
        role
        deactivatedAt
        deactivatedBy
        createdAt
        createdBy
        updatedAt
        updatedBy
        isDeleted
        deletedAt
        deletedBy
        TTL
        user {
          id
          userID
          sortKey
          itemType
          phoneNumber
          firstName
          lastName
          avatar {
            bucket
            key
            region
            localUri
            mimeType
            updatedAt
          }
          createdAt
          createdBy
          updatedAt
          updatedBy
          isDeleted
          deletedAt
          deletedBy
          SDBAccessToken
        }
      }
      nextToken
    }
  }
`;
export const queryGsiOrganisationsByUserId = /* GraphQL */ `
  query QueryGsiOrganisationsByUserId(
    $userID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelOrganisationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryGSIOrganisationsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        orgID
        sortKey
        itemType
        orgName
        logo {
          bucket
          key
          region
          localUri
          mimeType
          updatedAt
        }
        country
        orgSize
        industry
        website
        deptID
        deptName
        locationID
        locationName
        userID
        userSK
        memberID
        employeeID
        SDBAccessToken
        SDBAdminChannel
        role
        deactivatedAt
        deactivatedBy
        createdAt
        createdBy
        updatedAt
        updatedBy
        isDeleted
        deletedAt
        deletedBy
        TTL
        user {
          id
          userID
          sortKey
          itemType
          phoneNumber
          firstName
          lastName
          avatar {
            bucket
            key
            region
            localUri
            mimeType
            updatedAt
          }
          createdAt
          createdBy
          updatedAt
          updatedBy
          isDeleted
          deletedAt
          deletedBy
          SDBAccessToken
        }
      }
      nextToken
    }
  }
`;
export const queryGsiSoftDeletedOrganisations = /* GraphQL */ `
  query QueryGsiSoftDeletedOrganisations(
    $isDeleted: enum_isDeleted
    $deletedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrganisationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryGSISoftDeletedOrganisations(
      isDeleted: $isDeleted
      deletedAt: $deletedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        orgID
        sortKey
        itemType
        orgName
        logo {
          bucket
          key
          region
          localUri
          mimeType
          updatedAt
        }
        country
        orgSize
        industry
        website
        deptID
        deptName
        locationID
        locationName
        userID
        userSK
        memberID
        employeeID
        SDBAccessToken
        SDBAdminChannel
        role
        deactivatedAt
        deactivatedBy
        createdAt
        createdBy
        updatedAt
        updatedBy
        isDeleted
        deletedAt
        deletedBy
        TTL
        user {
          id
          userID
          sortKey
          itemType
          phoneNumber
          firstName
          lastName
          avatar {
            bucket
            key
            region
            localUri
            mimeType
            updatedAt
          }
          createdAt
          createdBy
          updatedAt
          updatedBy
          isDeleted
          deletedAt
          deletedBy
          SDBAccessToken
        }
      }
      nextToken
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $userID: ID
    $sortKey: ModelIDKeyConditionInput
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      userID: $userID
      sortKey: $sortKey
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userID
        sortKey
        itemType
        phoneNumber
        firstName
        lastName
        avatar {
          bucket
          key
          region
          localUri
          mimeType
          updatedAt
        }
        createdAt
        createdBy
        updatedAt
        updatedBy
        isDeleted
        deletedAt
        deletedBy
        SDBAccessToken
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($userID: ID!, $sortKey: ID!) {
    getUser(userID: $userID, sortKey: $sortKey) {
      id
      userID
      sortKey
      itemType
      phoneNumber
      firstName
      lastName
      avatar {
        bucket
        key
        region
        localUri
        mimeType
        updatedAt
      }
      createdAt
      createdBy
      updatedAt
      updatedBy
      isDeleted
      deletedAt
      deletedBy
      SDBAccessToken
    }
  }
`;
export const queryGsiSoftDeletedUsers = /* GraphQL */ `
  query QueryGsiSoftDeletedUsers(
    $isDeleted: enum_isDeleted
    $deletedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryGSISoftDeletedUsers(
      isDeleted: $isDeleted
      deletedAt: $deletedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        sortKey
        itemType
        phoneNumber
        firstName
        lastName
        avatar {
          bucket
          key
          region
          localUri
          mimeType
          updatedAt
        }
        createdAt
        createdBy
        updatedAt
        updatedBy
        isDeleted
        deletedAt
        deletedBy
        SDBAccessToken
      }
      nextToken
    }
  }
`;
export const queryGsiUsersByPhoneNumber = /* GraphQL */ `
  query QueryGsiUsersByPhoneNumber(
    $phoneNumber: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryGSIUsersByPhoneNumber(
      phoneNumber: $phoneNumber
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        sortKey
        itemType
        phoneNumber
        firstName
        lastName
        avatar {
          bucket
          key
          region
          localUri
          mimeType
          updatedAt
        }
        createdAt
        createdBy
        updatedAt
        updatedBy
        isDeleted
        deletedAt
        deletedBy
        SDBAccessToken
      }
      nextToken
    }
  }
`;
export const getSystem = /* GraphQL */ `
  query GetSystem($pk: String!, $sk: String!) {
    getSystem(pk: $pk, sk: $sk) {
      pk
      sk
      type
      content_cn
      content_en
      content_zh
      order
      updatedBy
      createdBy
      createdAt
      updatedAt
    }
  }
`;
export const listSystems = /* GraphQL */ `
  query ListSystems(
    $pk: String
    $sk: ModelStringKeyConditionInput
    $filter: ModelSystemFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSystems(
      pk: $pk
      sk: $sk
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        pk
        sk
        type
        content_cn
        content_en
        content_zh
        order
        updatedBy
        createdBy
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

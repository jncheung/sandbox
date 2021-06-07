/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOrganisationAndMember = /* GraphQL */ `
  mutation CreateOrganisationAndMember(
    $input: CreateOrganisationAndMemberInput
  ) {
    CreateOrganisationAndMember(input: $input) {
      Organisation {
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
      Owner {
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
  }
`;
export const createMember = /* GraphQL */ `
  mutation CreateMember($input: CreateMemberInput) {
    CreateMember(input: $input) {
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
      memberID
      employeeID
      SDBAccessToken
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
      err {
        code
        message
      }
    }
  }
`;
export const updateSdbAccessToken = /* GraphQL */ `
  mutation UpdateSdbAccessToken($input: UpdateSDBAccessTokenInput) {
    UpdateSDBAccessToken(input: $input) {
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
      memberID
      employeeID
      SDBAccessToken
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
    }
  }
`;
export const softDeleteUser = /* GraphQL */ `
  mutation SoftDeleteUser($input: SoftDeleteUserInput) {
    SoftDeleteUser(input: $input) {
      User {
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
      AffectedMembers {
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
  }
`;
export const softDeleteOrganisation = /* GraphQL */ `
  mutation SoftDeleteOrganisation($input: SoftDeleteOrganisationInput) {
    SoftDeleteOrganisation(input: $input) {
      Organisation {
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
      AffectedMembers {
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
  }
`;
export const deactivateMember = /* GraphQL */ `
  mutation DeactivateMember($input: DeactivateMemberInput) {
    DeactivateMember(input: $input) {
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
      memberID
      employeeID
      SDBAccessToken
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
    }
  }
`;
export const reactivateMember = /* GraphQL */ `
  mutation ReactivateMember($input: ReactivateMemberInput) {
    ReactivateMember(input: $input) {
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
      memberID
      employeeID
      SDBAccessToken
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
    }
  }
`;
export const deleteDepartment = /* GraphQL */ `
  mutation DeleteDepartment($input: DeleteDepartmentInput) {
    DeleteDepartment(input: $input) {
      Department {
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
      AffectedMembers {
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
  }
`;
export const deleteLocation = /* GraphQL */ `
  mutation DeleteLocation($input: DeleteLocationInput) {
    DeleteLocation(input: $input) {
      Location {
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
      AffectedMembers {
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
  }
`;
export const removeMember = /* GraphQL */ `
  mutation RemoveMember($input: RemoveMemberInput) {
    RemoveMember(input: $input) {
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
      memberID
      employeeID
      SDBAccessToken
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
    }
  }
`;
export const deleteSystem = /* GraphQL */ `
  mutation DeleteSystem(
    $input: DeleteSystemInput!
    $condition: ModelSystemConditionInput
  ) {
    deleteSystem(input: $input, condition: $condition) {
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
export const createOrganisation = /* GraphQL */ `
  mutation CreateOrganisation(
    $input: CreateOrganisationInput!
    $condition: ModelOrganisationConditionInput
  ) {
    createOrganisation(input: $input, condition: $condition) {
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
export const updateOrganisation = /* GraphQL */ `
  mutation UpdateOrganisation(
    $input: UpdateOrganisationInput!
    $condition: ModelOrganisationConditionInput
  ) {
    updateOrganisation(input: $input, condition: $condition) {
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
export const deleteOrganisation = /* GraphQL */ `
  mutation DeleteOrganisation(
    $input: DeleteOrganisationInput!
    $condition: ModelOrganisationConditionInput
  ) {
    deleteOrganisation(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createSystem = /* GraphQL */ `
  mutation CreateSystem(
    $input: CreateSystemInput!
    $condition: ModelSystemConditionInput
  ) {
    createSystem(input: $input, condition: $condition) {
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
export const updateSystem = /* GraphQL */ `
  mutation UpdateSystem(
    $input: UpdateSystemInput!
    $condition: ModelSystemConditionInput
  ) {
    updateSystem(input: $input, condition: $condition) {
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

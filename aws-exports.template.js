const awsmobile = {
    "aws_project_region": "ap-northeast-1",
    "aws_cognito_identity_pool_id": "${COGNITO_IDPOOL_ID}",
    "aws_cognito_region": "ap-northeast-1",
    "aws_user_pools_id": "${COGNITO_USERPOOL_ID}",
    "aws_user_pools_web_client_id": "${COGNITO_USERPOOL_WEBCLIENT_ID}",
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_appsync_graphqlEndpoint": "${APPSYNC_GRAPHQL_URL}",
    "aws_appsync_region": "ap-northeast-1",
    "aws_appsync_authenticationType": "AWS_IAM"
};

export default awsmobile;

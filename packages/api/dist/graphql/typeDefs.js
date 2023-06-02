"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `
  type AnalysisResult {
    success: Boolean!
    issues: [Issue!]!
    meta: AnalysisMeta
    sourceFormat: String!
    sourceList: [String!]!
    sourceType: String!
  }
  
  type Issue {
    description: IssueDescription
    extra: IssueExtra
    locations: [IssueLocation!]!
    severity: String!
    swcID: String!
    swcTitle: String!
  }
  
  type IssueDescription {
    head: String!
    tail: String!
  }
  
  type IssueExtra {
    discoveryTime: Int!
    testCases: [TestCase!]!
  }
  
  type TestCase {
    initialState: TestCaseState!
    steps: [TestCaseStep!]!
  }

  scalar Any
  
  type TestCaseState {
    accounts: Any!
  }
  
  type TestCaseStep {
    address: String!
    blockCoinbase: String!
    blockDifficulty: String!
    blockGasLimit: String!
    blockNumber: String!
    blockTime: String!
    calldata: String!
    gasLimit: String!
    gasPrice: String!
    input: String!
    name: String!
    origin: String!
    value: String!
  }
  
  type IssueLocation {
    sourceMap: String!
  }
  
  type AnalysisMeta {
    mythril_execution_info: ExecutionInfo
  }
  
  type ExecutionInfo {
    analysis_duration: Int!
  }

  type Mutation {
    analyze(bytecode: String!): AnalysisResult
  }

  type Query {
    hello: String
  }
`;
exports.default = typeDefs;

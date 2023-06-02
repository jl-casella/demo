export type AnalysisResult = {
    success: boolean;
    issues: [Issue];
    meta: AnalysisMeta;
    sourceFormat: string;
    sourceList: [string];
    sourceType: string;
};

export type Issue = {
    description: IssueDescription;
    extra: IssueExtra;
    locations: [IssueLocation];
    severity: string;
    swcID: string;
    swcTitle: string;
};

export type IssueDescription = {
    head: string;
    tail: string;
};

export type IssueExtra = {
    discoveryTime: number;
    testCases: [TestCase];
};
  
export type TestCase = {
    initialState: TestCaseState;
    steps: [TestCaseStep];
};

export type TestCaseState = {
    accounts: any;
};

type TestCaseStep = {
    address: string;
    blockCoinbase: string;
    blockDifficulty: string;
    blockGasLimit: string;
    blockNumber: string;
    blockTime: string;
    calldata: string;
    gasLimit: string;
    gasPrice: string;
    input: string;
    name: string;
    origin: string;
    value: string;
};

export type IssueLocation = {
    sourceMap: string;
};
  
export type AnalysisMeta = {
    mythril_execution_info: ExecutionInfo;
};
  
export type ExecutionInfo = {
    analysis_duration: number;
};

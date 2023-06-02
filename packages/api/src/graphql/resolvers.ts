import fs from 'fs';
import { exec } from 'child_process';
import { AnalysisResult } from './types';

interface MythAnalize extends Omit<AnalysisResult, "success"> {} {}

const resolvers = {
  Mutation: {
    analyze: async (parent, { bytecode }): Promise<AnalysisResult> => {
      // Save the bytecode to a file
      const filePath = 'testableCode.sol';
      fs.writeFileSync(filePath, bytecode);

      // Execute `myth -x analyze` command
      return new Promise((resolve, reject) => {
            exec(`myth analyze ./${filePath} -o jsonv2`, (error, stdout, stderr): any => {
                const jsonResult = JSON.parse(stdout.replace('/n', ''))[0];
                if (stderr) {
                    reject(stderr);
                } else {
                    const issues: MythAnalize = jsonResult

                    const response: AnalysisResult = {
                        success: true,
                        ...issues,
                    }

                    resolve(response);
                }
            });
      });
    },
  },
};

export default resolvers;

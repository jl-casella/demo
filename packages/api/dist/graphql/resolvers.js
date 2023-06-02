"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
{ }
const resolvers = {
    Mutation: {
        analyze: async (parent, { bytecode }) => {
            // Save the bytecode to a file
            const filePath = 'testableCode.sol';
            fs_1.default.writeFileSync(filePath, bytecode);
            // Execute `myth -x analyze` command
            return new Promise((resolve, reject) => {
                (0, child_process_1.exec)(`myth analyze ./${filePath} -o jsonv2`, (error, stdout, stderr) => {
                    const jsonResult = JSON.parse(stdout.replace('/n', ''))[0];
                    if (stderr) {
                        reject(stderr);
                    }
                    else {
                        const issues = jsonResult;
                        const response = {
                            success: true,
                            ...issues,
                        };
                        resolve(response);
                    }
                });
            });
        },
    },
};
exports.default = resolvers;

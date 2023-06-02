import React, { useEffect, useState } from 'react';
import './App.scss';

import { analizeQuery } from './graphql/analizeQuery';

const GRAPHQL_API_URL = 'http://localhost:3000/graphql';

const App = () => {
  const [fetching, setFetching] = useState(false);
  const [analysisDuration, setAnalysisDuration] = useState(undefined);
  const [issues, setIssues] = useState<any>([]);

  const [code, setCode] = useState(undefined);

  const fetchData = async ({ code }) => {
    try {
      setFetching(true);
      setIssues([]);
      setAnalysisDuration(undefined);

      const response = await fetch(GRAPHQL_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operationName: 'Analyze',
          query: analizeQuery,
          variables: {
            bytecode: code,
          },
        }),
      });

      const { data } = await response.json();
      setIssues(data?.analyze?.issues);
      setAnalysisDuration(
        data?.analyze?.meta?.mythril_execution_info?.analysis_duration
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const message = event.data;
      const code = message?.code;

      if (code) {
        setCode(code);
        fetchData({ code });
      }
    });
  }, []);

  return (
    <div className="app">
      <h1>Solidity code Analyzer</h1>
      <hr></hr>

      <div className="code-container">
        <p>{'Code to anlize:'}</p>

        <textarea readOnly={true} value={code} />
      </div>

      <hr></hr>

      <div className="actions-header">
        <h2>{fetching ? 'Analyzing, please wait...' : 'Results:'}</h2>

        <button disabled={fetching} onClick={() => fetchData({ code })}>
          Test again
        </button>
      </div>

      {analysisDuration ? (
        <>
          <p className="test-info">{`Analysis duration: ${analysisDuration}`}</p>
          <p className="test-info">Test engine: ConsenSys/mythril</p>
        </>
      ) : null}

      {issues?.length ? (
        <div className="collapsible">
          <div className="col">
            <div className="tabs">
              {issues.map((issue, index) => (
                <div className="tab" key={index}>
                  <input
                    type="checkbox"
                    id={`check${index}`}
                    defaultChecked={index === 0}
                  />
                  <label className="tab-label" htmlFor={`check${index}`}>
                    {issue?.description?.head}
                  </label>
                  <div className="tab-content">
                    <>
                      {issue?.description?.tail}

                      <div className="spacer" />

                      <div className="info">
                        <p className="info-key">Severity:</p>
                        <p className="info-value">{issue?.severity}</p>
                      </div>

                      <div className="info">
                        <p className="info-key">SWC ID:</p>
                        <p className="info-value">{issue?.swcID}</p>
                      </div>

                      <div className="info">
                        <p className="info-key">SWC Title:</p>
                        <p className="info-value">{issue?.swcTitle}</p>
                      </div>

                      <div className="spacer" />

                      <div className="info">
                        <p className="info-key">Discovery Time:</p>
                        <p className="info-value">
                          {issue?.extra?.discoveryTime}
                        </p>
                      </div>
                    </>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;

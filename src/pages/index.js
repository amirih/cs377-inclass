import React, { useState, useEffect, useRef } from "react";
import queryString from "qs";
import { TabMenu } from "primereact/tabmenu";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Fieldset } from "primereact/fieldset";
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";

export default function Home() {
  const defaultQuery = {
    demo: "SELECT * FROM university.course;",
    demo3: "SELECT * FROM university3.Vendors;",
  };
  const [data, setData] = useState([]);
  const [database, setDatabase] = useState("demo");
  const [apiRoute, setApiRoute] = useState("data-");
  const [query, setQuery] = useState(defaultQuery[database]);
  const [submit, setSubmit] = useState(false);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState("");
  const [tables, setTables] = useState(["course", "student", "enroll"]);
  const toast = useRef(null);

  const items = [].map((item) => ({
    label: item,
  }));
  const databaseOptions = ["demo", "demo3"].map((item) => ({
    name: item,
    value: item,
  }));

  async function resetDatabase() {
    const confirm = window.confirm(
      "NOTE: You will lose all the data you and other students added to the database. "
    );

    if (!confirm) {
      return;
    }

    const response = await fetch(`/api/reset-${database}`);
    console.log("response", response);
    const responseStatus = response.status;
    toast.current.show({
      severity: "info",
      summary: response.ok ? "Success" : "Error",
      detail: responseStatus === 200 ? "Database Reset" : "Error",
    });
    if (response.ok) {
      setQuery(defaultQuery[database]);
      fetchData();
    }
  }

  async function fetchData() {
    const response = await fetch(
      "/api/" + apiRoute + database + "?" + queryString.stringify({ query })
    );
    const data = await response.json();

    //reconstruct columns from data:
    const columns = [];
    if (data?.data?.length > 0) {
      for (const key in data.data[0]) {
        columns.push({ field: key, header: key });
      }
      setColumns(columns);
      setError("");
    }
    const tables = [];
    for (const key in data.tables) {
      tables.push(data.tables[key].tablename);
    }
    setTables(tables);
    if (data.error) {
      setError(data.error);
      setData([]);
      setColumns([]);
      return;
    }

    setData(data.data);
  }
  useEffect(() => {
    console.log("data", data);
  }, [data]);

  useEffect(() => {}, [query]);
  useEffect(() => {
    //clean up and fetch data
    setColumns([]);
    setError("");
    setData([]);
    setTables([]);

    fetchData();
    console.log("returned data:", data);
    console.log("returned columns:", columns);
    console.log("returned error:", error);
    console.log("returned tables:", tables);
  }, [submit]);

  useEffect(() => {
    setData([]);
    setQuery(defaultQuery[database]);
    setSubmit(!submit);
  }, [database]);

  return (
    <div>
      <Toast ref={toast} />

      <div className="p-4 md:p-6 lg:p-8">
        <div
          className="border-2 border-dashed surface-border border-round surface-card"
          style={{ minHeight: "20rem" }}
        >
          <Message
            severity="error"
            text="All the data you added to the database will be visible to other students"
            className="m-1 md:m-1 lg:m-1"
          />
          <div className="surface-section px-4 py-5 md:px-6 lg:px-8">
            <div className="flex lg:align-items-center flex-column lg:flex-row">
              <div className="text-3xl font-medium text-900 mr-0 lg:mr-4 mb-4 lg:mb-0">
                CS 377 Emory University
              </div>
              <TabMenu
                model={items}
                activeitem={items[0]}
                className="flex-grow-1"
              />
            </div>
          </div>
          <div className="p-2">
            <Dropdown
              value={database}
              onChange={(e) => setDatabase(e.value)}
              options={databaseOptions}
              optionLabel="name"
              placeholder="Select a Database"
              className="w-full m-1 md:w-14rem"
            />

            <Message
              severity="info"
              text="All the students have super user privilege "
              className="m-1 md:m-1 lg:m-1"
            />
          </div>
          <Fieldset legend="Tables:" className="m-1">
            <div className="m-0">
              {tables.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          </Fieldset>
          <Button
            label="Reset Database to Default"
            onClick={() => resetDatabase()}
            className="m-1 bg-blue-500 shadow-1 border-round-sm border-none cursor-pointer hover:bg-blue-600 transition-duration-200"
          />
          <Message
            severity="warn"
            text="All the data you and other students added to the database will be deleted after you reset the database"
            className="m-1 md:m-1 lg:m-1"
          />
          <div>
            <InputTextarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={10}
              cols={30}
              className="m-2"
            />
          </div>
          <Button
            label="Submit"
            onClick={() => setSubmit(!submit)}
            className="m-1 bg-green-500 shadow-1 border-round-sm border-none cursor-pointer hover:bg-green-600 transition-duration-200"
          />

          <div>
            {data && (
              <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
                {columns.map((col) => (
                  <Column
                    key={col.field}
                    field={col.field}
                    header={col.header}
                  ></Column>
                ))}
              </DataTable>
            )}
            {error && <div className="text-red-500">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}


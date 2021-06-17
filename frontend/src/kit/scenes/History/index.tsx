import React, { useEffect, useState } from "react";
import "./index.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import { userApi } from "../../../service/user";

function History() {
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    try {
      userApi.history().then((response) => {
        setResults(response.data);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <Container style={{ background: "#fff" }}>
        <Row>
          <Col>
            <br />
            <h2 className="results_title">История проверок</h2>
            <br />
          </Col>
        </Row>
        {results && (
          <Card>
            {results.map((item: any) => {
              return JSON.parse(item.checkResults)
                .filter((result: any) => {
                  let appendable = false;
                  result.lv_values.forEach(
                    (lv: any) => lv.value >= 70 && (appendable = true)
                  );
                  return appendable;
                })
                .map((result: any) => {
                  return (
                    <div style={{ background: "#fff" }}>
                      <p>
                        <Card.Header>
                          <strong>Адрес страницы:</strong>{" "}
                          {result.url !== "local" && (
                            <a href={result.url}>{result.url}</a>
                          )}{" "}
                          {result.url === "local" &&
                            "Проверка методом сравнения"}{" "}
                          <br />
                          <strong>Дата проверки: </strong>{" "}
                          {new Date(item.createdAt).toDateString()} <br />
                          <strong>Имя студента:</strong>{" "}
                          {item.student.firstName}
                          <br />
                          <strong>Фамилия студента:</strong>{" "}
                          {item.student.lastName}
                          <br />
                          <strong>Группа студента:</strong> {item.student.group}
                          <br />
                        </Card.Header>
                        {result.lv_values.map((lv: any) => {
                          if (lv.value >= 70) {
                            return (
                              <>
                                <Card.Body>
                                  <Card.Title>
                                    <p>
                                      Результат проверки методом Левтенштейна:{" "}
                                      <strong>{lv.value.toFixed(2)}%</strong>
                                    </p>
                                    <p>
                                      Метод Шинглеров:{" "}
                                      <strong>{lv.shinglingValue}%</strong>
                                    </p>
                                  </Card.Title>
                                </Card.Body>
                              </>
                            );
                          }
                        })}
                      </p>
                    </div>
                  );
                });
            })}
          </Card>
        )}

        <br />
        <hr />
      </Container>
    </>
  );
}

export default History;

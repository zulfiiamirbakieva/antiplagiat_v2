import React, { useState } from "react";
import "./index.css";
import AceEditor from "react-ace";
import { checkApi } from "../../../service/checkAPI";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";

function Editor() {
  const [lang, setLang] = useState<string>("javascript");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [group, setGroup] = useState<string>("");

  const [content, setContent] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSelectLang = (e: any) => {
    setLang(e.target.value);
  };

  const onChange = (newValue: any) => {
    setContent(newValue);
  };

  const check = async () => {
    setLoading(true);
    try {
      const response = await checkApi.check(
        {
          lang: lang,
          student_group: group,
          student_name: name,
          student_surname: surname,
        },
        content
      );
      setResults(response.data);
      setShowResults(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loader">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!loading && (
        <Container fluid>
          {!showResults && (
            <Row>
              <Col md={2} className={"py-4"} style={{ background: "#fff" }}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Язык программирования</Form.Label>
                  <Form.Control as="select" onChange={onSelectLang}>
                    <option value={"javascript"}>Javascript</option>
                    <option value={"java"}>Java</option>
                    <option value={"php"}>PHP</option>
                    <option value={"c_cpp"}>C++</option>
                    <option value={"csharp"}>C#</option>
                    <option value={"python"}>Python</option>
                  </Form.Control>
                </Form.Group>
                <hr />
                <Form.Group controlId="studentName">
                  <Form.Label>Имя студента</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="studentLastName">
                  <Form.Label>Фамилия студента</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Фамилия"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="studentGroup">
                  <Form.Label>Группа студента</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Группа"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={check}>
                  Проверить
                </Button>
              </Col>
              <Col md={10} className={"p-0"}>
                <AceEditor
                  mode={lang}
                  theme="monokai"
                  onChange={onChange}
                  name="UNIQUE_ID_OF_DIV"
                  editorProps={{ $blockScrolling: true }}
                  width={"100%"}
                  height={"calc(100vh - 56px)"}
                />
              </Col>
            </Row>
          )}
          {showResults && (
            <Container style={{ background: "#fff" }}>
              <Row>
                <Col>
                  <br />
                  <h2 className="results_title">
                    Наиболее подходящие результаты
                  </h2>
                  <br />
                </Col>
              </Row>
              <Card>
                {results.expand
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
                            Адрес страницы:{" "}
                            <a href={result.url}>{result.url}</a>
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
                  })}
              </Card>

              <br />
              <hr />
            </Container>
          )}
        </Container>
      )}
    </>
  );
}

export default Editor;

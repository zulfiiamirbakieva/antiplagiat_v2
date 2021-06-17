import React, { useState } from "react";
import "./index.css";
import AceEditor, {split as SplitEditor} from "react-ace";

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

function EditorSplit() {
    const [lang, setLang] = useState<string>("javascript");
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const onChange = (newValue: any) => {
        setContent(newValue);
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
                    <Row>
                        <Col md={12} className={'p-0'}>
                            <SplitEditor
                                mode={lang}
                                theme="monokai"
                                splits={2}
                                name="UNIQUE_ID_OF_DIV"
                                editorProps={{ $blockScrolling: true }}
                                width={"100%"}
                                height={"calc(100vh - 56px)"}
                            />
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}

export default EditorSplit;
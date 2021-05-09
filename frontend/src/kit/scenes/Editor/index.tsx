import React, {useState} from 'react';
import AceEditor from "react-ace";
import {checkApi} from '../../../service/checkAPI'
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";


import "ace-builds/src-noconflict/theme-monokai";

function Editor() {
    const [lang, setLang] = useState<string>('javascript')
    const [content, setContent] = useState<string>('')

    const onSelectLang = (e: any) => {
        setLang(e.target.value)
    }

    const onChange = (newValue: any) => {
        setContent(newValue);
    }

    const check = async () => {
        console.log(lang)
        console.log(content)
        const response = await checkApi.check(lang, content)
        console.log(response)
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={2}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Язык программирования</Form.Label>
                            <Form.Control as="select" onChange={onSelectLang}>
                                <option value={'javascript'}>Javascript</option>
                                <option value={'java'}>Java</option>
                                <option value={'php'}>PHP</option>
                                <option value={'c_cpp'}>C++</option>
                                <option value={'csharp'}>C#</option>
                                <option value={'python'}>Python</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" onClick={check}>Проверить</Button>
                    </Col>
                    <Col md={10}>
                        <AceEditor
                            mode={lang}
                            theme="monokai"
                            onChange={onChange}
                            name="UNIQUE_ID_OF_DIV"
                            editorProps={{ $blockScrolling: true }}
                            width={'100vw'}
                            height={'calc(100vh - 56px)'}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Editor;
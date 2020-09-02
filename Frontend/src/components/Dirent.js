import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { saveAs } from 'file-saver';
import {
  FolderFill,
  FileEarmarkTextFill,
  Arrow90degUp,
  FileArrowDownFill,
  TrashFill,
  // Pencil
} from 'react-bootstrap-icons';

const DirCard = (props) => {
  let [deleted, setDeleted] = useState(false)
  let [redirect, setRedirect] = useState(null)

  const iconStyle = { color: '#61AFEF', size: 30 };
  let icon = <FileEarmarkTextFill {...iconStyle} />;

  if (props.isDirectory) {
    icon = <FolderFill {...iconStyle} />;
  }
  if (props.parentDirectory) {
    icon = <Arrow90degUp {...iconStyle} />;
  }
  
  const path = props.path ? `${props.path}:${props.name}` : props.name;
  const downloadLink = `${process.env.REACT_APP_API_URL}/apiDownload/${path}`;
  const deleteLink = `${process.env.REACT_APP_API_URL}/apiDelete/${path}`;

  let textClick = ()=>{
    if (props.isDirectory && !deleted) {
      let link = `/content/${props.name}`;
      if (props.path) {
        link = `${props.path}-${props.name}`;
      }
      if (props.parentDirectory) {
        link = link.split(':').slice(0, -2).join(':') || '/content/';
      }
      console.log(link)
      setRedirect(<Redirect to={link} />)
    }
  }

  // TODO: Edit and delete files
  return (
    <Card>
      {redirect}
      <Card.Body>
        <Container>
          <Row>
            <Col 
            xs={props.isDirectory ? '' : 8} 
            style={{ padding: 0, cursor: 'pointer'  }}
            onClick={textClick}
            >
              <Card.Text
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {icon} {props.name}
              </Card.Text>
            </Col>
            {props.isDirectory ? (<></>) : (
              <Col
                style={{ padding: 0, cursor: 'pointer' }}
                className="d-flex flex-row-reverse"
                onClick={() => saveAs(downloadLink, props.name)}
              >
                <FileArrowDownFill {...iconStyle} />
                {/* <Pencil {...iconStyle} /> */}
              </Col>
              )}
            {props.parentDirectory ? (<></>) : (
              <Col
                style={{ padding: 0, cursor: 'pointer' }}
                className="d-flex flex-row-reverse"
                onClick={() => {fetch(deleteLink); setDeleted(true); props.reload();}}
              >
                <TrashFill size={30} color="#E06C75" />
              </Col>
            )}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

const Dirent = (props) => {
  if (!props.path && props.parentDirectory) {
    return <></>;
  }

  return (
    <Col lg={4} xl={3} className="mt-2">
      <DirCard {...props} />
    </Col>
  );
};

export default Dirent;

import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "../attorney.css";

function CaseStats() {
  return (
    <Row className="mb-6">
      <Col md={6} xl={3} xs={12}>
        <Card className="mb-2">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0">Cases Summary</h4>
              </div>
            </div>
            <div className="text-center my-4">
              <h1 className="display-3 mb-0 fw-bold cases-summary">50</h1>
              <p className="mt-4 mb-0">Total Cases</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} xl={3} xs={12}>
        <Card className="mb-2">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0">Open Cases</h4>
              </div>
            </div>
            <div className="text-center my-4">
              <h1 className="display-3 mb-0 fw-bold open-cases">12</h1>
              <p className="mt-4 mb-0">6 New Filings</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} xl={3} xs={12}>
        <Card className="mb-2">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0">Closed Cases</h4>
              </div>
            </div>
            <div className="text-center my-4">
              <h1 className="display-3 mb-0 fw-bold closed-cases">30</h1>
              <p className="mt-4 mb-0">2 Closing Documents Needed</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} xl={3} xs={12}>
        <Card className="mb-2">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0">Potential Cases</h4>
              </div>
            </div>
            <div className="text-center my-4">
              <h1 className="display-3 mb-0 fw-bold potential-cases">8</h1>
              <p className="mt-4 mb-0">8 New Leads</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
export default CaseStats;

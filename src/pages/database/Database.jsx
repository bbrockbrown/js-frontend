import React, { useState } from 'react';

import TabCard from '@/common/components/atoms/TabCard';
import styled from 'styled-components';

const PageContainer = styled.div`
  flex: 1;
  padding: 2rem;
  overflow: auto;
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  color: var(--text);
`;

const TabContent = styled.div`
  padding: 1rem;
`;

const InfoBanner = styled.div`
  background: #e0f2fe;
  border: 1px solid #7dd3fc;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #0369a1;
`;

const TableWrapper = styled.div`
  background: rgb(255, 255, 255);
  border-radius: 10px;
  overflow: auto;
  padding: 1rem;
`;

const Table = styled.table`
  width: 100%;
  min-width: 2400px;
  border-collapse: collapse;
  color: white;
`;

const Th = styled.th`
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid #cbd5e1;
  border-right: 1px solid #e2e8f0;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  background: #f8fafc;
  color: #334155;
  min-width: 130px;
  max-width: 200px;
  line-height: 1.35;
  vertical-align: top;

  &:last-of-type {
    border-right: none;
  }
`;

const SectionTh = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #cbd5e1;
  border-right: 1px solid #e2e8f0;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #475569;
  background: #f1f5f9;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  line-height: 1.3;

  &:last-of-type {
    border-right: none;
  }
`;

const Td = styled.td`
  padding: 8px 12px;
  border-bottom: 1px solid #e2e8f0;
  border-right: 1px solid #f1f5f9;
  font-size: 0.85rem;
  min-width: 130px;
  max-width: 200px;

  &:last-of-type {
    border-right: none;
  }
`;

const Input = styled.input`
  width: 100%;
  min-width: 70px;
  background: transparent;
  border: none;
  color: #1e293b;
  font-size: 0.85rem;

  &::placeholder {
    color: #94a3b8;
    font-style: italic;
  }

  &:focus {
    outline: 1px solid #6aa9ff;
    border-radius: 2px;
  }
`;

const Select = styled.select`
  width: 100%;
  min-width: 70px;
  background: transparent;
  border: none;
  color: #1e293b;
  font-size: 0.85rem;
  cursor: pointer;

  &:focus {
    outline: 1px solid #6aa9ff;
    border-radius: 2px;
  }
`;

// Column definitions grouped by section per spec
const COLUMN_SECTIONS = [
  {
    name: 'Basic Information',
    columns: [
      { key: 'firstName', label: 'First name', placeholder: 'e.g. Jane' },
      { key: 'lastName', label: 'Last name', placeholder: 'e.g. Smith' },
      { key: 'email', label: 'Email address', placeholder: 'name@example.com' },
      { key: 'phoneNumber', label: 'Phone number', placeholder: '(555) 123-4567' },
      { key: 'gender', label: 'Gender', placeholder: 'e.g. Female' },
      { key: 'dateOfBirth', label: 'Date of birth', placeholder: 'MM/DD/YYYY' },
      { key: 'ageAtEnrollment', label: 'Age at time of enrollment', placeholder: 'e.g. 25' },
      { key: 'ethnicityRace', label: 'Ethnicity / race', placeholder: 'e.g. Hispanic' },
      { key: 'currentCity', label: 'Current city', placeholder: 'e.g. Chicago' },
      { key: 'zipCode', label: 'ZIP code', placeholder: 'e.g. 60601' },
    ],
  },
  {
    name: 'Program Information',
    columns: [
      { key: 'programStatus', label: 'Program status', placeholder: 'Applied, active, on hold, completed, inactive' },
      { key: 'programName', label: 'Program name', placeholder: 'e.g. CDL Certificate' },
      { key: 'programYear', label: 'Program year', placeholder: 'e.g. 2024' },
      { key: 'term', label: 'Term', placeholder: 'e.g. Spring 2024' },
      { key: 'startDate', label: 'Program start date', placeholder: 'MM/DD/YYYY' },
      { key: 'endDate', label: 'Program end date', placeholder: 'MM/DD/YYYY' },
      { key: 'continuingStudent', label: 'Continuing student', placeholder: 'Yes or No' },
    ],
  },
  {
    name: 'Attendance and Participation',
    columns: [
      { key: 'firstAttendanceVerification', label: '1st attendance verification', placeholder: 'Interest form date' },
      { key: 'secondAttendanceVerification', label: '2nd attendance verification', placeholder: 'Registration form date' },
      { key: 'followUpNeeded', label: 'Follow-up needed', placeholder: 'Yes or No' },
      { key: 'followUpDate', label: 'Follow-up date', placeholder: 'MM/DD/YYYY' },
      { key: 'transitionToWorkSubmissionDate', label: 'Transition-to-work submission date', placeholder: 'MM/DD/YYYY' },
    ],
  },
  {
    name: 'Certification and Assessment',
    columns: [
      { key: 'permitExamDate', label: 'Permit exam date', placeholder: 'MM/DD/YYYY' },
      { key: 'industryCertificationStatus', label: 'Industry certification status', placeholder: 'e.g. Certified' },
      { key: 'certificationName', label: 'Certification name', placeholder: 'e.g. CDL Class A' },
      { key: 'examPassStatus', label: 'Exam pass status', placeholder: 'Pass or Fail' },
      { key: 'assessmentNotes', label: 'Assessment notes', placeholder: 'Notes...' },
      { key: 'employabilitySkillsNotes', label: 'Employability skills notes', placeholder: 'Notes...' },
    ],
  },
  {
    name: 'Employment Tracking',
    columns: [
      { key: 'assignedEmploymentEngagementSpecialist', label: 'Assigned Employment Specialist', placeholder: 'Specialist name' },
      { key: 'employmentStatus', label: 'Employment status', placeholder: 'Employed or Not employed' },
      { key: 'dateOfHire', label: 'Date of hire', placeholder: 'MM/DD/YYYY' },
      { key: 'employmentVerificationSource', label: 'Employment verification source', placeholder: 'e.g. Pay stub' },
      { key: 'employerName', label: 'Employer name', placeholder: 'Company name' },
      { key: 'employerAddress', label: 'Employer address', placeholder: 'Street address' },
      { key: 'employerCity', label: 'Employer city', placeholder: 'City' },
      { key: 'employerIndustry', label: 'Employer industry', placeholder: 'e.g. Transportation' },
      { key: 'hourlyWage', label: 'Hourly wage', placeholder: 'e.g. 25.00' },
      { key: 'annualWage', label: 'Annual wage', placeholder: 'e.g. 52000' },
    ],
  },
];

const ALL_COLUMNS = COLUMN_SECTIONS.flatMap((s) => s.columns);

const createEmptyRow = () =>
  ALL_COLUMNS.reduce((acc, col) => ({ ...acc, [col.key]: '' }), {});

const SAMPLE_DATA = Array.from({ length: 10 }, () => createEmptyRow());

function EditableTable({ extraColumns = [], isIHTU = false }) {
  const [rows, setRows] = useState(SAMPLE_DATA);

  const handleChange = (rowIndex, field, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][field] = value;
    setRows(updatedRows);
  };

  const columnsWithExtra = [
    ...ALL_COLUMNS,
    ...extraColumns,
  ];

  const renderCell = (row, rowIndex, col) => {
    const value = row[col.key] || '';

    if (col.key === 'programStatus') {
      return (
        <Select
          value={value}
          onChange={(e) => handleChange(rowIndex, col.key, e.target.value)}
        >
          <option value="">—</option>
          <option value="applied">Applied</option>
          <option value="active">Active</option>
          <option value="on hold">On hold</option>
          <option value="completed">Completed</option>
          <option value="inactive">Inactive</option>
        </Select>
      );
    }

    if (col.key === 'continuingStudent' || col.key === 'followUpNeeded') {
      return (
        <Select
          value={value}
          onChange={(e) => handleChange(rowIndex, col.key, e.target.value)}
        >
          <option value="">—</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Select>
      );
    }

    if (col.key === 'employmentStatus') {
      return (
        <Select
          value={value}
          onChange={(e) => handleChange(rowIndex, col.key, e.target.value)}
        >
          <option value="">—</option>
          <option value="employed">Employed</option>
          <option value="not employed">Not employed</option>
        </Select>
      );
    }

    return (
      <Input
        value={value}
        onChange={(e) => handleChange(rowIndex, col.key, e.target.value)}
        placeholder={col.placeholder}
      />
    );
  };

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            {COLUMN_SECTIONS.map((section) => (
              <SectionTh
                key={section.name}
                colSpan={section.columns.length}
              >
                {section.name}
              </SectionTh>
            ))}
            {extraColumns.length > 0 && (
              <SectionTh colSpan={extraColumns.length}>
                {isIHTU ? 'Linked Student' : 'Additional'}
              </SectionTh>
            )}
          </tr>
          <tr>
            {columnsWithExtra.map((col) => (
              <Th key={col.key}>{col.label}</Th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columnsWithExtra.map((col) => (
                <Td key={col.key}>{renderCell(row, rowIndex, col)}</Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
}

export default function Database() {
  const tabs = [
    {
      label: 'Oakton Community College',
      content: (
        <TabContent>
          <EditableTable />
        </TabContent>
      ),
    },
    {
      label: 'I Hope They Understand',
      content: (
        <TabContent>
          <InfoBanner>
            For students under 18, records represent parents or legal guardians.
            Students are linked to parents with Basic Information, Program
            Information, and Attendance and Participation.
          </InfoBanner>
          <EditableTable
            isIHTU
            extraColumns={[
              { key: 'linkedStudentName', label: 'Linked student name', placeholder: 'Student name (if under 18)' },
            ]}
          />
        </TabContent>
      ),
    },
  ];

  return (
    <PageContainer>
      <PageTitle>Admin Database</PageTitle>

      <TabCard tabs={tabs} />
    </PageContainer>
  );
}

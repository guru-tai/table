import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './Table';

describe('Table Component', () => {
  it('rendering the component', () => {
    render(<Table />);
    expect(screen.getByText("Table")).toBeInTheDocument()
  });

  it("adding a new row",()=>{
    render(<Table/>)
    const text=screen.getByText("Add");
    fireEvent.click(text);
    const rows=screen.getAllByRole("row");
    expect(rows).toHaveLength(2);
  })

  it("removing a row in the table",()=>{
    render(<Table/>)
    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getByText('Remove'));
    const row=screen.getAllByRole("row");
    expect(row).toHaveLength(1);
  })

  it("editing the row",()=>{
    render(<Table/>);
    fireEvent.click(screen.getByText("Add"));
    const buttons=screen.getAllByRole('button',{name:/Edit/i});
    fireEvent.click(buttons[0]);
    const input = screen.getAllByDisplayValue('')[0];
    fireEvent.change(input,{target:{value:'Tap Academy'}})
    fireEvent.click(screen.getByText('Save'));
    expect(screen.getByText('Tap Academy')).toBeInTheDocument();
  })
  
  it("testing filter is clickable or not",()=>{
    render(<Table/>);
    fireEvent.click(screen.getByText('Filters'));
    expect(screen.getByText("minimum score:")).toBeInTheDocument();
  })
  
})
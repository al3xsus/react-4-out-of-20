import {Dropdown, Table} from "semantic-ui-react";
import Button from "./Content";
import React from "react";


const ResultTable = ({options, draw, tickets, combinations, price, onDrawChange, ticketsNum}) => {
    return <Table basic={"very"} className={"ui very basic table"}>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell colSpan={2} textAlign={"center"}>
                    <h2>4x20</h2>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.Cell>Кол-во тиражей</Table.Cell>
                <Table.Cell textAlign={"right"}>
                    <Dropdown
                        compact
                        selection
                        options={options}
                        value={draw}
                    />
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Билетов</Table.Cell>
                <Table.Cell textAlign={"right"}>
                    {ticketsNum}
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Комбинаций</Table.Cell>
                <Table.Cell textAlign={"right"}>{combinations}</Table.Cell>
            </Table.Row>
        </Table.Body>
        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell>Сумма</Table.HeaderCell>
                <Table.HeaderCell textAlign={"right"}>
                    {price}
                </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
                <Table.HeaderCell textAlign={"center"} colSpan={2}>
                    <Button color={"green"} content={"Подтвердить"} disabled={ticketsNum<=0}/>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    </Table>
};
export default ResultTable;

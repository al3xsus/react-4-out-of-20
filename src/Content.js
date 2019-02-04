import React, { Component } from "react";
import {
  Tab,
  Form,
  Grid,
  Table,
  Segment,
  Dropdown,
  Button
} from "semantic-ui-react";
import ResultTable from "./ResultTable";

class Content extends Component {
  defaultState = {
    tickets: [],
    panes: [],
    draw: 1,
    activeIndex: 0
  };

  constructor(props) {
    super(props);
    this.state = { ...this.defaultState };
  }

  componentDidMount() {
    const newState = this.defaultState;
    newState.panes.push(this.returnPane(1));
    newState.tickets.push({ id: 1, left: [], right: [] });
    this.setState(newState);
    console.log(this.teest(4, 4));
  }

  handleAddPane = () => {
    const newState = { ...this.state };
    const pane_id = newState.panes.length + 1;
    newState.panes.push(this.returnPane(pane_id));
    newState.tickets.push({ id: pane_id, left: [], right: [] });
    newState.activeIndex = newState.panes.length - 1;
    this.setState(newState);
  };

  checkColor = (ticket_id, panel, id) => {
    const { tickets } = this.state;
    const ticketIndex = tickets.findIndex(x => x.id === parseInt(ticket_id));
    const btnIndex = tickets[ticketIndex][panel].findIndex(x => x === id);
    if (btnIndex === -1) return "white";
    else return "green";
  };

  generateSimple = (ticket_id, panel) => {
    const generateSimpleDev = param => {
      let newArray = Array.from(Array(4).keys());
      return newArray.map(item => (
        <button
          style={{
            backgroundColor: this.checkColor(
              ticket_id,
              panel,
              4 * param + (item + 1)
            )
          }}
          className={"game"}
          key={4 * param + (item + 1)}
          onClick={() =>
            this.handleClick(ticket_id, panel, 4 * param + (item + 1))
          }
        >
          {4 * param + (item + 1)}
        </button>
      ));
    };
    let newArray = Array.from(Array(5).keys());
    return newArray.map((item, i) => (
      <div key={item + i}>{generateSimpleDev(item)}</div>
    ));
  };

  handleClick = (ticket_id, panel, id) => {
    const newState = { ...this.state };
    const ticketIndex = newState.tickets.findIndex(
      x => x.id === parseInt(ticket_id)
    );
    const btnIndex = newState.tickets[ticketIndex][panel].findIndex(
      x => x === id
    );
    if (btnIndex === -1) newState.tickets[ticketIndex][panel].push(id);
    else
      newState.tickets[ticketIndex][panel] = newState.tickets[ticketIndex][
        panel
      ].filter(item => item !== id);
    this.setState(newState);
  };

  handleRandom = ticket_id => {
    const generateRandomArray = () => {
      let arr = [];
      while (arr.length < 4) {
        let r = Math.floor(Math.random() * 20) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
      }
      return arr;
    };
    const newState = { ...this.state };
    const ticketIndex = newState.tickets.findIndex(
      x => x.id === parseInt(ticket_id)
    );
    newState.tickets[ticketIndex].left = generateRandomArray(ticket_id);
    newState.tickets[ticketIndex].right = generateRandomArray(ticket_id);
    this.setState(newState);
  };

  handleClear = ticket_id => {
    const newState = { ...this.state };
    const ticketIndex = newState.tickets.findIndex(
      x => x.id === parseInt(ticket_id)
    );
    newState.tickets[ticketIndex].left = [];
    newState.tickets[ticketIndex].right = [];

    this.setState(newState);
  };

  returnPane = pane_id => {
    return {
      menuItem: `Билет № ${pane_id}`,
      render: () => (
        <Tab.Pane id={pane_id} attached={false}>
          <Form>
            <Form.Group widths="equal">
              <div className={"gamezone"}>
                {this.generateSimple(pane_id, "left")}
              </div>
              <div className={"gamezone"}>
                {this.generateSimple(pane_id, "right")}
              </div>
            </Form.Group>
            <Button onClick={() => this.handleRandom(pane_id)}>Случайно</Button>
            <Button onClick={() => this.handleClear(pane_id)}>Очистить</Button>
          </Form>
        </Tab.Pane>
      )
    };
  };

  onDrawChange = (e, { value }) => {
    const newState = { ...this.state };
    newState.draw = value;
    this.setState(newState);
  };

  onDropAll = () => {
    const newState = this.defaultState;
    newState.panes = [this.returnPane(1)];
    newState.tickets = [{ id: 1, left: [], right: [] }];
    newState.activeIndex = 0;
    this.setState(newState);
  };

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  teest = (n, k) => {
    const factorial = n => {
      return n === 1 ? n : n * factorial(--n);
    };

    const combinations = (n, r) => {
      if (n === r) return 1;
      else return factorial(n) / (factorial(r) * factorial(n - r));
    };

    return combinations(n, k);
  };

  returnCombinations = tickets => {
    const factorial = n => {
      return n === 1 ? n : n * factorial(--n);
    };

    const combinations = (n, r) => {
      if (n === r) return 1;
      else return factorial(n) / (factorial(r) * factorial(n - r));
    };

    let result = 0;
    tickets.forEach(ticket => {
      if (ticket.left.length >= 4 && ticket.right.length >= 4) {
        console.log(ticket.left.length, ticket.right.length);
        result =
          result +
          combinations(ticket.left.length, 4) *
            combinations(ticket.right.length, 4);
      }
    });
    return result;
  };

  checkTickets = tickets => {
    console.log(tickets);
    let result = 0;
    tickets.forEach(ticket => {
      if (ticket.left.length >= 4 && ticket.right.length >= 4) {
        result = result + 1;
      }
    });
    return result;
  };

  render() {
    const { panes, tickets, draw, activeIndex } = this.state;
    console.log(this.state);
    let combinations = this.returnCombinations(tickets);
    let price = combinations * draw * 200;
    let ticketsNum = this.checkTickets(tickets);
    const options = [...Array(5)].map((_, i) => {
      return { key: i + 1, text: i + 1, value: i + 1 };
    });
    return (
      <Grid columns={2} style={{ backgroundColor: "aliceblue" }}>
        <Grid.Row>
          <Grid.Column width={9}>
            <Segment>
              <Tab
                menu={{
                  secondary: true,
                  pointing: true,
                  stackable: true,
                  className: "wrapped"
                }}
                activeIndex={activeIndex}
                panes={panes}
                onTabChange={this.handleTabChange}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={7}>
            <Segment>
              <Table basic={"very"} className={"ui very basic table"}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan={2} textAlign={"center"}>
                      <h2>4 из 20</h2>
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
                        onChange={this.onDrawChange}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Билетов</Table.Cell>
                    <Table.Cell textAlign={"right"}>{ticketsNum}</Table.Cell>
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
                      <Button
                        color={"green"}
                        content={"Подтвердить"}
                        disabled={ticketsNum <= 0}
                      />
                    </Table.HeaderCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>
                      <Button
                          icon={"plus"}
                          color={"green"}
                          onClick={this.handleAddPane}
                          basic={true}
                          content={"Добавить билет"}
                      />
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign={"right"}>
                      <Button
                          color={"grey"}
                          onClick={this.onDropAll}
                          basic={true}
                          content={"Сбросить всё"}
                          style={{ float: "right" }}
                      />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Content;

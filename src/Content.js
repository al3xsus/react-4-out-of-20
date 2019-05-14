import React, { Component } from "react";
import {
  Tab,
  Form,
  Grid,
  Table,
  Segment,
  Dropdown,
  Button,
  Icon
} from "semantic-ui-react";
import { returnCombinations, checkTickets, checkColor } from "./AuxFn";

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
  }

  handleAddPane = () => {
    const newState = { ...this.state };
    const pane_id = newState.panes.length + 1;
    newState.panes.push(this.returnPane(pane_id));
    newState.tickets.push({ id: pane_id, left: [], right: [] });
    newState.activeIndex = newState.panes.length - 1;
    this.setState(newState);
  };

  generateSimple = (ticket_id, panel) => {
    const generateSimpleDev = param => {
      let newArray = Array.from(Array(4).keys());
      return newArray.map(item => (
        <button
          style={{
            backgroundColor: checkColor(this.state.tickets, ticket_id, panel, 4 * param + (item + 1))
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
            <Form.Field style={{ textAlign: "center", marginRight: "25px" }}>
              <p>
                Отметьте не менее 4 чисел в каждом поле. Стоимость каждого
                билета - 100 рублей
              </p>
            </Form.Field>
            <Button
              color={"yellow"}
              basic={true}
              floated={"left"}
              icon={"random"}
              onClick={() => this.handleRandom(pane_id)}
              content={"Случайно"}
            />
            <Button
              color={"red"}
              icon={'remove'}
              basic={true}
              floated={"right"}
              style={{ marginRight: "25px" }}
              onClick={() => this.handleClear(pane_id)}
              content={"Очистить"}
            />
            <br />
            <br />
          </Form>
        </Tab.Pane>
      )
    };
  };

  handleDrawChange = (e, { value }) => {
    const newState = { ...this.state };
    newState.draw = value;
    this.setState(newState);
  };

  handleDropAll = () => {
    const newState = this.defaultState;
    newState.panes = [this.returnPane(1)];
    newState.tickets = [{ id: 1, left: [], right: [] }];
    newState.activeIndex = 0;
    this.setState(newState);
  };

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  render() {
    const { panes, tickets, draw, activeIndex } = this.state;
    let combinations = returnCombinations(tickets);
    let price = combinations * draw * 100;
    let ticketsNum = checkTickets(tickets);
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
                        onChange={this.handleDrawChange}
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
                    <Table.HeaderCell>
                      <h4>Сумма</h4>
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign={"right"}>
                      <h4>{price}</h4>
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
                        animated={true}
                        color={"green"}
                        onClick={this.handleAddPane}
                        basic={true}
                      >
                        <Button.Content visible>
                          <Icon name={"plus"} /> Добавить
                        </Button.Content>
                        <Button.Content hidden>+ 1 билет</Button.Content>
                      </Button>
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign={"right"}>
                      <Button
                        color={"red"}
                        icon={'refresh'}
                        onClick={this.handleDropAll}
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

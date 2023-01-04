import React from "react";
import "./assets/styles/styles.scss";
// @ts-ignore
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

interface IAppSolutionProps {}

interface IAppSolutionState {
  settings: {
    text?: string;
    background?: string;
  };
  context: any;
  name: string;
  board: any;
}

class AppSolution extends React.Component<
  IAppSolutionProps,
  IAppSolutionState
> {
  constructor(props: IAppSolutionProps) {
    super(props);

    // Default state
    this.state = {
      settings: {
        text: "בהצלחה לכולם תנו בראש!",
      },
      context: {},
      name: "",
      board: {},
    };
  }

  componentDidMount() {
    // TODO: set up event listeners
    monday.listen("settings", (res: any) => {
      this.setState({ settings: res.data });
    });

    monday.api(`query { me { name } }`).then((res: any) => {
      if (res.data && res.data.me) {
        this.setState({ name: res.data.me.name });
      }
    });
  }

  render() {
    return (
      <div
        className="App"
        style={{ background: this.state.settings.background }}
      >
        Hello, {this.state.name}!
      </div>
    );
  }
}

export default AppSolution;

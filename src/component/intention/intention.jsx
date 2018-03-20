import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { NavBar, Icon, List, Picker, WhiteSpace } from "antd-mobile";
import { createForm } from "rc-form";
import { district, provinceLite } from "antd-mobile-demo-data";
console.log("district", district);
// 如果不是使用 List.Item 作为 children
const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: "#fff", paddingLeft: 15 }}
  >
    {console.log("props", props)}
    <div
      className="test"
      style={{ display: "flex", height: "45px", lineHeight: "45px" }}
    >
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}
      >
        {props.children}
      </div>
      <div style={{ textAlign: "right", color: "#888", marginRight: 15 }}>
        编辑
      </div>
    </div>
    <div />
    <div>
        {props.value}
    </div>
    <WhiteSpace size="xs" />
  </div>
);

@connect(state => ({ user: state.get("user") }), {})
@withRouter
class Intention extends Component {
  constructor(props) {
    super(props);
    this.setWorkState = this.setWorkState.bind(this);
    this.state = {
      workState: [
        {
          value: 0,
          label: "我目前正在职，正考虑换个新环境"
        },
        {
          value: 1,
          label: "我目前已离职，可快速到岗"
        },
        {
          value: 2,
          label: "我暂时不想找工作"
        },
        {
          value: 3,
          label: "我是应届毕业生"
        }
      ],
      selState: 0,
      selText:'我目前正在职，正考虑换个新环境'
    };
  }
  setWorkState() {}
  render() {
    const Item = List.Item;
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <NavBar
          mode="dar"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
        >
          求职意向
        </NavBar>
        <Picker
          value={this.state.selState}
          data={this.state.workState}
          onChange={v =>
            this.setState({ selState: v, selText: this.state.workState[v].label })
          }
          cols={1}
          title=""
          val={123}
          extra="编辑"
        >
          <CustomChildren value={this.state.selText}>在职状态</CustomChildren>
        </Picker>
        <WhiteSpace size="xs" />
      </div>
    );
  }
}

export default createForm()(Intention);

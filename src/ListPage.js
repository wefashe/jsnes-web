import React, { Component } from "react";
import "./ListPage.css";
import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";
import config from "./config";

import RomLibrary from "./RomLibrary";

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      romLibrary: RomLibrary.load()
    };
  }
  render() {
    return (
      <div
        className="drop-zone"
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <div className="container ListPage py-4">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <header className="mb-4">
                <h1 className="mb-3">FC 游戏在线玩</h1>
              </header>

              <ListGroup className="mb-4">
                {Object.keys(config.ROMS)
                  .sort()
                  .map(key => (
                    <Link
                      key={key}
                      to={"/run/" + encodeURIComponent(key)}
                      className="list-group-item"
                    >
                      {config.ROMS[key]["name"]}
                      <span className="float-right">&rsaquo;</span>
                    </Link>
                  ))}
              </ListGroup>

              <p>
                没找到喜欢的游戏？直接将游戏 NES ROM 拖动到本页面即可在线运行
              </p>

              {this.state.romLibrary.length > 0 ? (
                <div>
                  <p>最近运行:</p>

                  <ListGroup className="mb-4">
                    {this.state.romLibrary
                      .sort((a, b) => new Date(b.added) - new Date(a.added))
                      .map(rom => (
                        <Link
                          key={rom.hash}
                          to={"run/local-" + rom.hash}
                          className="list-group-item"
                        >
                          {rom.name}
                          <span
                            onClick={e => {
                              e.preventDefault();
                              this.deleteRom(rom.hash);
                            }}
                            className="delete"
                            title="Delete"
                          >
                            &times;
                          </span>
                          <span className="float-right">&rsaquo;</span>
                        </Link>
                      ))}
                  </ListGroup>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  deleteRom = hash => {
    RomLibrary.delete(hash);
    this.updateLibrary();
  };

  updateLibrary = () => {
    this.setState({ romLibrary: RomLibrary.load() });
  };

  handleDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  handleDrop = e => {
    e.preventDefault();

    const file = e.dataTransfer.items
      ? e.dataTransfer.items[0].getAsFile()
      : e.dataTransfer.files[0];

    RomLibrary.save(file).then(rom => {
      this.updateLibrary();
      this.props.history.push({ pathname: "run/local-" + rom.hash });
    });
  };
}

export default ListPage;

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faAlignJustify, faImage, faTable } from '@fortawesome/free-solid-svg-icons'

import "./App.css";

function App() {
  
  library.add(fab, faAlignJustify, faImage, faTable)

  const [items, setItems] = useState([]);

  function handleOnDrag(e, name, tipo, icon) {
    e.dataTransfer.setData("name", name);
    e.dataTransfer.setData("tipo", tipo);
    e.dataTransfer.setData("icon", icon);
  }

  function handleOnDrop(e) {

    let id_board = e.currentTarget.parentElement.id 
    const name = e.dataTransfer.getData("name")
    const tipo = e.dataTransfer.getData("tipo")
    const icon = e.dataTransfer.getData("icon")
    // console.log("tipo", tipo);

    if ( tipo === 'img' && id_board === "header_") {
        let item = { 
          name: name + '_' + uuidv4().slice(0,4), 
          tipo : id_board, 
          id : uuidv4().slice(0,8),  
          bgcolor : "lightgreen",
          icon: icon 
        }

        // console.log('nada')
        setItems([...items, item]);

    } else if ( tipo === 'txt' && id_board === "footer_") {

        let item = { 
          name: name + '_' + uuidv4().slice(0,4), 
          tipo : id_board, 
          id : uuidv4().slice(0,8),
          bgcolor: "#ee9090",
          icon: icon 

        }

        // console.log(item)
        setItems([...items, item]);

    } else if ( tipo.length === 3 && id_board === "body_") {

        let item = { 
          name: name + '_' + uuidv4().slice(0,4), 
          tipo : id_board, 
          id : uuidv4().slice(0,8),
          bgcolor: "#eeed90",
          icon: icon
        }

        // console.log(item)
        setItems([...items, item]);

    } else {

      if ( tipo === "footer_" && id_board === "body_" ) {

        e.preventDefault();

      } else if ( tipo === "body_" && id_board === "footer_" ) {

        e.preventDefault();

      } else if ( tipo === "header_" && id_board === "footer_" ) {

        e.preventDefault();

      } else if ( tipo.length > 3 ) {

        let updatedItems = items.filter((item) => {
         
          if (item.id === name) {
            item.tipo = id_board;
          }

          return item;
        });

        setItems([...updatedItems]);
      }
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  const readElements = () => {
    const elementsToRender = {
      header_: [],
      body_: [],
      footer_: []
    };

    items.forEach((item) => {
      elementsToRender[item.tipo].push(
        <div
          key={item.id}
          onDragStart={(e) => handleOnDrag(e, item.id, item.tipo, item.con)}
          draggable
          className="element-card"
          style={{ backgroundColor: item.bgcolor }}
        >
          
          <FontAwesomeIcon icon={item.icon} />
          {item.name}

        </div>
      );
    });

    return elementsToRender;
  };


  return (
    <div className="container">
      <div className="board">

        <div id="header_" className="section">

          <div className="board-header">Header <div className="background">Add only Image </div> </div>
          <div
            className="drag-drop-board"
            onDrop={handleOnDrop} 
            onDragOver={handleDragOver}
          > 
            { readElements().header_ }

          </div>

        </div>

        <div id="body_" className="section">

          <div className="board-header">Body  <div className="background">Add Text, Image or Table </div> </div>
          <div
            className="drag-drop-board"
            onDrop={handleOnDrop} 
            onDragOver={handleDragOver}
          > 
            { readElements().body_ }
          </div>

        </div>

        <div id="footer_" className="section">

          <div className="board-header">Footer  <div className="background">Add only Text </div> </div>
          <div
            className="drag-drop-board"
            onDrop={handleOnDrop} 
            onDragOver={handleDragOver}
          > 
            { readElements().footer_ }
          </div>

        </div>


      </div>

      <div className="elements">
        <div className="elements-header">Elements </div>
        <div className="elements-row">

          <div
            className="item_button"
            draggable
            onDragStart={(e) => handleOnDrag(e, "Text", 'txt', 'align-justify')}
          >
            <FontAwesomeIcon icon="align-justify" />
            <span>Text</span>
            
          </div>

          <div
            className="item_button"
            draggable
            onDragStart={(e) => handleOnDrag(e, "Image", 'img', 'image')}
          >
            <FontAwesomeIcon icon="image" />
            <span>Image</span>
            
          </div>

          <div
            className="item_button"
            draggable
            onDragStart={(e) => handleOnDrag(e, "Table", 'tab', 'table')}
          >
            <FontAwesomeIcon icon="table" />
            <span>Table</span>
            
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;
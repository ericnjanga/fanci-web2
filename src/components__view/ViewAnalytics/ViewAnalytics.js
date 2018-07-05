import React from 'react';


const ViewTermsAndConditions = (props) => {

  const pMargin = 10;

  const style = {

    container: {
      marginTop: '30px',
      display: 'flex',
      flexWrap: 'wrap',
    },
    panel: {
      width: `calc(50% - 2 * ${pMargin}px)`,
      textAlign: 'center',
      background: '#333',
      padding: `${pMargin * 2}px ${pMargin}px`,
      margin: `${pMargin}px`,
      color: '#ccc',
      borderRadius: `${pMargin}px`,
      heading: {
        textTransform: 'uppercase',
        color: '#ff9800',
        fontSize: '1rem',
      },
      text: {
        fontSize: '4rem',
      },
    },
  };


  return (
    <div className="view__content ViewTimeline" style={style.container}>

      <div style={style.panel}>
        <h2 style={style.panel.heading}>
          Users
        </h2>
        <span style={style.panel.text}>{props.listUsers.length}</span>
      </div>

      <div style={style.panel}>
        <h2 style={style.panel.heading}>
          Fanci Created
        </h2>
        <span style={style.panel.text}>{props.postList.length}</span>
      </div>

      <div style={style.panel}>
        <h2 style={style.panel.heading}>
          Subscriptions
        </h2>
        <span style={style.panel.text}>...</span>
      </div>

      <div style={style.panel}>
        <h2 style={style.panel.heading}>
          Latest Login
        </h2>
        <span style={style.panel.text}>...</span>
      </div>
    </div>
  );

} // [end] TermsAndConditions

export default ViewTermsAndConditions;

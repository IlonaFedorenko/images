import { Component } from 'react';
import { Circles } from 'react-loader-spinner';

export class Loader extends Component {
  render() {
    return (
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          margin: '0 auto',
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          zIndex: '9999',
        }}
        wrapperClass=""
        visible={true}
      />
    );
  }
}
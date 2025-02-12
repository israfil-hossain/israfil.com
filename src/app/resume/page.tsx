import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      
      {/* First Embed */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 0,
        paddingTop: '141.4286%',
        paddingBottom: 0,
        boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
        marginTop: '1.6em',
        marginBottom: '0.9em',
        overflow: 'hidden',
        borderRadius: '8px',
        willChange: 'transform'
      }}>
        <iframe
          loading="lazy"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            border: 'none',
            padding: 0,
            margin: 0
          }}
          src="https://www.canva.com/design/DAGJEegqE20/_np_Ky_8aI6ZYLsAq-IbKQ/view?embed"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Page;
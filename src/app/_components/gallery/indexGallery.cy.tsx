import React from 'react';
import Gallery from './index';

describe('<Gallery />', () => {
  // Test to check if the image component inside gallery component is rendering when the data is available
  it('renders images when data is provided', () => {
    const camera_object = {full_name:'', id:0, name:'',rover_id:0};
    const rover_object = {id:0, landing_date:'', launch_date:'',name: '', status:''}
    const data = [
      { id: 1, img_src: '/test_image.png', camera: camera_object, earth_date:'', rover: rover_object, sol:0 },
      { id: 2, img_src: '/test_image.png', camera: camera_object, earth_date:'', rover: rover_object, sol:0 },
    ];

    cy.mount(<Gallery data={data} />);
    cy.get('[data-testid="image"]').should('have.length', data.length);
  });

  // Test to check if the message "No photos available" is rendering when data is empty or undefined
  it('renders "No photos available" message when data is not provided or empty', () => {
    cy.mount(<Gallery data={undefined} />);
    cy.contains('No photos available').should('be.visible');

    cy.mount(<Gallery data={[]} />);
    cy.contains('No photos available').should('be.visible');
  });
});
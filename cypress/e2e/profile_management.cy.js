describe('Profile Management API Tests', () => {
    const baseUrl = 'https://dev.user.api.aceplus.in'; 
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3MjQsIm5hbWUiOiJOaWtoaWwiLCJhdmF0YXJfdXJsIjpudWxsLCJwaG9uZSI6IjgwMDU3MTc2NDciLCJpc19hY3RpdmUiOnRydWV9LCJpYXQiOjE3Mjk3NDk3NTMsImV4cCI6MTczODM4OTc1M30.lnmgWzzzLL1T24HyLuTNPKcQH2oYAbCOiCAzFAMuZnQ';
    let profileId; 
    let slotKey;
    
    afterEach(function () {
        if (this.currentTest.state === 'failed') {
          const errorMessage = this.currentTest.err?.message || 'No error message available';
          const errorStack = this.currentTest.err?.stack || 'No stack trace available';
          const errorDetails = `Test Name: ${this.currentTest.title}\nError Message: ${errorMessage}\nStack Trace: ${errorStack}`;
          const subject = `API Test Failure: ${this.currentTest.title}`;
          const text = `The test "${this.currentTest.title}" has failed.\n${errorDetails}`;
    
          cy.task('sendEmail', { subject, text });
        }
      });
  
    it('Add Profile', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/app/profile`,
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
        body: {
          name: 'Nanuuuu Soni',
          dob: '2000-10-10',
          grade: '3rd',
          is_default: false,
          school: 'Abe School',
          city: 'City',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        profileId = response.body.data.profile.id; 
        cy.log(JSON.stringify(response.body));
      });
    });
  
    it('Profile List', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/app/profile`,
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(JSON.stringify(response.body));
      });
    });
  
    it('Get Profile by Profile ID', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/intra/profile/${profileId}`, 
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(JSON.stringify(response.body));
      });
    });
  
    it('Mark Default Profile', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/app/profile/${profileId}/default`, 
        headers: {
          Authorization:`Bearer ${accessToken}`, 
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(JSON.stringify(response.body));
      });
    });
  
    it('Profile Grades List', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/app/profile/grades`,
        headers: {
          Authorization:`Bearer ${accessToken}`, 
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(JSON.stringify(response.body));
      });
    });
  
    it('Update Profile', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/app/profile/${profileId}`, 
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
        body: {
          name: 'Sanjay Sahu',
          dob: '2000-10-10',
          grade: '3',
          avatar_url: 'https://i.pravatar.cc/512',
          is_default: false,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(JSON.stringify(response.body));
      });
    });
  
  // Session Slot API Tests
  it('Get Session Slots by Capsule ID', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/app/session_slot/v1/1`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
     
      slotKey = response.body.data.slots.available_slots[0].slot_key;
      cy.log(`Slot Key: ${slotKey}`);
      cy.log(JSON.stringify(response.body));
    });
  });
  
  it('Book or Schedule a Session', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/app/session_slot/v1`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        slot_key: slotKey, 
        session_type: 'capsule_meeting',
        session_type_ref: '2',
      },
    }).then((response) => {
      expect(response.status).to.eq(202);
      cy.log(JSON.stringify(response.body));
    });
  });
  });


  
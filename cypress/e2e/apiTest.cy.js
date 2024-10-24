describe('API Tests - User Authentication, Signup, Parent Details, User Detail, and Delete User by OTP', () => {
  const baseUrl = 'https://dev.user.api.aceplus.in';
  let otp_token = '';
  let access_token = '';
  let enteredOtp = '';
  let user_id = '';
  const phone = '8005717647';

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

  // 1. Send OTP
  it('POST - Send OTP', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/app/auth/otp/send`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        phone: phone,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      otp_token = response.body.data.otp_token;
      cy.log('OTP Token:', otp_token);
    });
  });

  // 2. Signup User Test
  it('POST - Signup User', () => {
    cy.window().then((win) => {
      enteredOtp = win.prompt('Please enter the OTP sent to your phone:');

      cy.request({
        method: 'POST',
        url: `${baseUrl}/app/auth/otp/signup`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: {
          phone: phone,
          otp: enteredOtp,
          otp_token: otp_token,
          name: "Nikhil",
          email: "nikhilkumar7838715@gmail.com",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        const userData = response.body.data;
        cy.log('User Data:', userData);
      });
    });
  });

  // 3. Validate OTP Test
  it('POST - Validate OTP', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/app/auth/otp/validate`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        phone: phone,
        otp: enteredOtp,
        otp_token: otp_token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      access_token = response.body.data.access_token;
      user_id = response.body.data.user.id;
      cy.log('Access Token:', access_token);
      cy.log('User ID:', user_id);
    });
  });

  // 4. Edit Parent Details Test
  it('POST - Edit Parent Name and Email', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/app/parent/${user_id}/edit`,
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: {
        name: "Edited",
        email: "nanu@hotmail.com",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const updatedParent = response.body.data.profile;
      expect(updatedParent).to.have.property('name', 'Edited');
      expect(updatedParent).to.have.property('email', 'nanu@hotmail.com');
      cy.log('Updated Parent Details:', updatedParent);
    });
  });

  // 5. User Detail Test
  it('GET - User Detail', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/app/auth`,
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.status === 500) {
        cy.log('Error: Internal Server Error');
        cy.log('Response:', response.body);
      } else {
        expect(response.status).to.eq(200);
        const userDetails = response.body.data.user;
        expect(userDetails).to.have.property('id');
        expect(userDetails).to.have.property('name');
        expect(userDetails).to.have.property('phone');
        cy.log('User Details:', userDetails);
        expect(userDetails.id).to.eq(user_id);
      }
    });
  });

  // 6. Delete User by OTP
  it('POST - Delete User by OTP', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/app/auth/delete/user`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        phone: phone,
        otp: enteredOtp,
        otp_token: otp_token,
      },
    }).then((response) => {
      if (response.status === 406) {
        cy.log('Error: OTP is not valid');
        cy.log('Response:', response.body);
      } else {
        expect(response.status).to.eq(200);
        const deleteResponse = response.body;
        cy.log('User Deletion Response:', deleteResponse);
      }
    });
  });
});

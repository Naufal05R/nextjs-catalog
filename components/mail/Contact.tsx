import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactEmail: React.FC<Readonly<EmailTemplateProps>> = ({ name }) => (
  <div>
    <h1>Welcome, {name}!</h1>
  </div>
);

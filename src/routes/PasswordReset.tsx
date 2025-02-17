type PasswordResetProps = {
  userId: string;
};

function PasswordReset({ userId }: PasswordResetProps) {
  return (
    <main className='PasswordReset'>
      <h1>This is the Password Reset screen</h1>
    </main>
  );
}

export default PasswordReset;

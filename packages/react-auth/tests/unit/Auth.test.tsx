import { Auth as AmplifyAuth } from 'aws-amplify';
import { Auth } from '../../src/Auth';
import { act, render, screen, userEvent, waitFor } from '@ttoss/test-utils';

jest.mock('aws-amplify', () => {
  return {
    Auth: {
      signIn: jest.fn().mockResolvedValue({}),
      signUp: jest.fn().mockResolvedValue({}),
      confirmSignUp: jest.fn().mockResolvedValue({}),
    },
  };
});

const email = 'some@email.com';

const password = 'somepassword';

test('should call Amplify Auth.signIn', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  /**
   * Arrange
   */
  render(<Auth />);

  /**
   * Act
   */
  await user.type(screen.getByLabelText('Email'), email);
  await user.type(screen.getByLabelText('Password'), password);

  await act(async () => {
    await waitFor(async () => {
      await user.click(screen.getByRole('button'));
    });
  });

  /**
   * Assert
   */
  expect(AmplifyAuth.signIn).toHaveBeenCalledWith(email, password);
});

test('should call Amplify Auth.signUp and Auth.confirmSignUp', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(<Auth />);

  /**
   * Sign In screen
   */

  await user.click(screen.getByText("Don't have an account? Sign up"));

  expect(AmplifyAuth.signIn).not.toHaveBeenCalled();

  /**
   * Sign Up screen
   */
  await user.type(screen.getByLabelText('Email'), email);
  await user.type(screen.getByLabelText('Password'), password);

  await act(async () => {
    await waitFor(async () => {
      await user.click(screen.getByRole('button'));
    });
  });

  expect(AmplifyAuth.signUp).toHaveBeenCalledWith({
    username: email,
    password,
    attributes: { email },
  });

  /**
   * Confirm Sign Up screen
   */
  const code = '123456';

  await user.type(screen.getByLabelText('Code'), code);

  await act(async () => {
    await user.click(screen.getByRole('button'));
  });

  expect(AmplifyAuth.confirmSignUp).toHaveBeenCalledWith(email, code);
});

test('should render logo', () => {
  const logo = <p>logo</p>;

  render(<Auth logo={logo} />);

  expect(screen.getByText('logo')).toBeInTheDocument();
});

test('loading bar should render', async () => {
  (AmplifyAuth.signIn as jest.Mock).mockResolvedValue({});

  render(<Auth />);

  expect(screen.queryByRole('progressbar')).toBeNull();

  // userEvent.type(screen.getByLabelText('email'), email);
  // userEvent.type(screen.getByLabelText('password'), password);
  // userEvent.click(screen.getByRole('button'));

  // TODO: add appear and disappear tests.
});

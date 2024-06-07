import './Style.css';

function Login() {
  return (
      <div class="signinsignup">
        <div class="rectangle-parent">
          <div class="frame-child">
          <b class="image-or-color">Image or color</b>
          <div class="shape-parent" id="groupContainer1">
            <div class="home">Home</div>
          </div>
          <div class="frame-item">
          <div class="email-parent">
            <b class="email">Email</b>
            <input class="group-child"></input>
            <b class="password">Password</b>
            <input class="group-item"></input>
          </div>
          <div class="new-user" id="newUserText">New user?</div>
          <div class="forget-password">Forget Password?</div>
        </div>
        <div class="button">
          <div class="label">SignIn</div>
        </div>
        </div>
        </div>
      </div>
  );
}

export default Login;

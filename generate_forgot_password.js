const fs = require('fs');

const data = fs.readFileSync('signin.html', 'utf8');

// 1. Title
let modified = data.replace('<title>Stackly - Sign In</title>', '<title>Stackly - Forgot Password</title>');

// 2. Welcome Back text
modified = modified.replace('Welcome Back', 'Reset Password');
modified = modified.replace('Sign in to manage your reservations and profile.', 'Enter your email address to receive a password reset link.');

// 3. Form elements to remove
modified = modified.replace(/<!-- Password -->[\s\S]*?<!-- Remember Me -->/g, '<!-- Remember Me -->');
modified = modified.replace(/<!-- Remember Me -->[\s\S]*?<!-- Buttons -->/g, '<!-- Buttons -->');

// 4. Button text
modified = modified.replace('Sign In\n                    </button>', 'Send Reset Link\n                    </button>');

// 5. Remove "OR Continue with Google"
modified = modified.replace(/<div class="position-relative text-center my-4">[\s\S]*?<\/button>/g, '');

// 6. Change "Don't have an account..."
modified = modified.replace("Don't have an account?", "Remember your password?");
modified = modified.replace('href="signup.html"', 'href="signin.html"');
modified = modified.replace('Create\n                            Account', 'Sign In');

fs.writeFileSync('forgot-password.html', modified, 'utf8');
console.log('Generated forgot-password.html');

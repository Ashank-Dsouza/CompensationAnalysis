import { authentication } from 'wix-members';


authentication.onLogin((memberInfo) => {
  const memberId = memberInfo.id;
  console.log('Member logged in');
});


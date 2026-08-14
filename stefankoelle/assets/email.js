function obfuscateEmail(user, domain, tld) {
  return user + '@' + domain + '.' + tld;
}
document.addEventListener('DOMContentLoaded', function() {
  var emailLink = document.getElementById('email-link');
  if (emailLink) {
    emailLink.href = 'mailto:' + obfuscateEmail('cv', 'stefankoelle', 'de');
    emailLink.textContent = obfuscateEmail('cv', 'stefankoelle', 'de');
  }
});
document.addEventListener('DOMContentLoaded', function() {
  var emailLink = document.getElementById('email-impressum');
  if (emailLink) {
    emailLink.href = 'mailto:' + obfuscateEmail('impressum', 'stefankoelle', 'de');
    emailLink.textContent = obfuscateEmail('impressum', 'stefankoelle', 'de');
  }
});

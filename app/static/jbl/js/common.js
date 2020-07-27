function getCookieValue(a) {
	var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
	return b ? b.pop() : '';
}

export function getKBaseCookie() {

	let kbaseSessionCookie = getCookieValue("kbase_session");
	let kbaseSessionBackupCookie = getCookieValue("kbase_session_backup");
	let authCookie = null;
	if (kbaseSessionBackupCookie) {
		authCookie = kbaseSessionBackupCookie;
	}
	else if (kbaseSessionCookie) {
		authCookie = kbaseSessionCookie;
	}
	else {
		console.log("Failure to get any cookies. The cookies we found are:");
		console.log(document.cookie);
	}

	return authCookie;
}
import Vue from 'vue';
import {
	Dialog
} from 'vant';

document.addEventListener('plusready', function() {
	history.pushState(null, null, document.URL);
	var webview = plus.webview.currentWebview();
	plus.key.addEventListener('backbutton', function() {
		webview.canBack(function(e) {
			if (e.canBack) {
				console.log(e.canBack)
				// webview.location.reload(0)
				webview.back(-1);
			} else {
				Dialog.confirm({
						message: '您确定要退出吗',
					})
					.then(() => {
						webview.close(); //关闭应用
					})
					.catch(() => {
						webview.back(0); //关闭应用  
					});
			}

		})
	});
})


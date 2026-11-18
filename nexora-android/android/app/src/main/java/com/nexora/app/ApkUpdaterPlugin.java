package com.nexora.app;

import android.content.Intent;
import android.net.Uri;

import androidx.core.content.FileProvider;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;

@CapacitorPlugin(name = "ApkUpdater")
public class ApkUpdaterPlugin extends Plugin {

    private File resolveApkFile(String path) {
        File dir = getContext().getCacheDir();
        File out = new File(dir, path);
        if (!out.getAbsolutePath().startsWith(dir.getAbsolutePath())) {
            throw new IllegalArgumentException("Path keluar dari cache directory");
        }
        return out;
    }

    @PluginMethod
    public void writeApk(PluginCall call) {
        String path = call.getString("path");
        String dataB64 = call.getString("data");
        if (path == null || dataB64 == null) {
            call.reject("path dan data (base64) wajib diisi");
            return;
        }
        try {
            File out = resolveApkFile(path);
            byte[] bytes = Base64.getDecoder().decode(dataB64);
            File parent = out.getParentFile();
            if (parent != null && !parent.exists()) {
                //noinspection ResultOfMethodCallIgnored
                parent.mkdirs();
            }
            try (OutputStream os = new FileOutputStream(out)) {
                os.write(bytes);
            }
            JSObject result = new JSObject();
            result.put("ok", true);
            result.put("path", out.getAbsolutePath());
            result.put("size", out.length());
            call.resolve(result);
        } catch (IllegalArgumentException | IOException e) {
            call.reject("Gagal menulis file APK: " + e.getMessage(), e);
        }
    }

    @PluginMethod
    public void installApk(PluginCall call) {
        String path = call.getString("path");
        if (path == null) {
            call.reject("path wajib diisi");
            return;
        }
        try {
            File apk = resolveApkFile(path);
            if (!apk.exists()) {
                call.reject("File APK tidak ditemukan: " + path);
                return;
            }
            Uri uri = FileProvider.getUriForFile(
                    getContext(),
                    getContext().getPackageName() + ".fileprovider",
                    apk
            );
            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.setDataAndType(uri, "application/vnd.android.package-archive");
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            if (intent.resolveActivity(getContext().getPackageManager()) == null) {
                call.reject("Tidak ada package installer di perangkat ini");
                return;
            }
            getContext().startActivity(intent);
            JSObject result = new JSObject();
            result.put("started", true);
            result.put("uri", uri.toString());
            call.resolve(result);
        } catch (RuntimeException e) {
            call.reject("Gagal membuka installer: " + e.getMessage(), e);
        }
    }
}

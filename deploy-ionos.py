#!/usr/bin/env python3
"""
deploy-ionos.py — Lädt ofenrohre.de via SFTP auf IONOS-Webspace hoch.
Zugangsdaten aus .ionos.env im selben Verzeichnis.
"""

import os
import sys
import paramiko
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
ENV_FILE = SCRIPT_DIR / ".ionos.env"
LOCAL_DIR = SCRIPT_DIR / "ofenrohre.de"


def load_env(path):
    env = {}
    with open(path) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            key, _, value = line.partition("=")
            env[key.strip()] = value.strip()
    return env


def sftp_mkdir_p(sftp, remote_path):
    """Erstellt Verzeichnisse rekursiv (mkdir -p)."""
    parts = Path(remote_path).parts
    current = ""
    for part in parts:
        current = str(Path(current) / part) if current else part
        try:
            sftp.stat(current)
        except FileNotFoundError:
            sftp.mkdir(current)


def upload(sftp, local_dir, remote_dir):
    uploaded = 0
    skipped = 0
    for local_path in sorted(local_dir.rglob("*")):
        rel = local_path.relative_to(local_dir)
        remote_path = str(Path(remote_dir) / rel)

        if local_path.is_dir():
            try:
                sftp.stat(remote_path)
            except FileNotFoundError:
                print(f"  mkdir  {remote_path}")
                sftp.mkdir(remote_path)
            continue

        # Datei: nur hochladen wenn lokal neuer oder nicht vorhanden
        local_mtime = local_path.stat().st_mtime
        local_size = local_path.stat().st_size
        try:
            remote_stat = sftp.stat(remote_path)
            if remote_stat.st_mtime >= local_mtime and remote_stat.st_size == local_size:
                skipped += 1
                continue
        except FileNotFoundError:
            pass

        print(f"  upload {rel}")
        sftp.put(str(local_path), remote_path)
        uploaded += 1

    return uploaded, skipped


def main():
    if not ENV_FILE.exists():
        print(f"Fehler: {ENV_FILE} nicht gefunden.")
        sys.exit(1)

    env = load_env(ENV_FILE)
    host = env.get("IONOS_HOST")
    user = env.get("IONOS_USER")
    password = env.get("IONOS_PASS")
    remote_dir = env.get("IONOS_REMOTE_DIR", "/")

    if not host or not user or not password:
        print("Fehler: IONOS_HOST, IONOS_USER und IONOS_PASS müssen in .ionos.env gesetzt sein.")
        sys.exit(1)

    print(f"Verbinde mit {user}@{host} ...")
    transport = paramiko.Transport((host, 22))
    transport.connect(username=user, password=password)
    sftp = paramiko.SFTPClient.from_transport(transport)

    print(f"Uploade {LOCAL_DIR} -> {remote_dir} ...")
    uploaded, skipped = upload(sftp, LOCAL_DIR, remote_dir)

    sftp.close()
    transport.close()
    print(f"\nFertig: {uploaded} hochgeladen, {skipped} unverändert übersprungen.")


if __name__ == "__main__":
    main()

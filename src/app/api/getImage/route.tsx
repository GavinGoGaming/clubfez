import { google } from 'googleapis';
import path from 'path';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');

    if (!fileId) {
        return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
    }

    const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
    const KEYFILEPATH = path.join(process.cwd(), 'API_KEY.json');

    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES,
    });

    const drive = google.drive({ version: 'v3', auth });

    try {
        const file = await drive.files.get({
            fileId,
            fields: 'name, mimeType',
        });

        const fileStream = await drive.files.get(
            { fileId, alt: 'media' },
            { responseType: 'stream' }
        );

        const webStream = Readable.toWeb(fileStream.data);

        // Set headers
        const headers = {
            'Content-Type': file.data.mimeType || 'application/octet-stream',
            'Content-Disposition': `inline; filename="${file.data.name}"`,
        };

        return new Response(webStream as any, { headers });
    } catch (error: any) {
        console.error('Error serving file:', error.message);
        return NextResponse.json({ error: 'Failed to retrieve the file' }, { status: 500 });
    }
}
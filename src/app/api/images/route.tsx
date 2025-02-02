import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import events from '@/app/utils/eventData';

export async function GET(request: Request): Promise<void | Response> {
  const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
  const KEYFILEPATH = path.join(process.cwd(), 'API_KEY.json');
  const { searchParams } = new URL(request.url||"");
  if(!searchParams.has('event')) {
    return Response.json({ error: 'Event is required' });
  }
  let event = searchParams.get('event')||"none";
  if(!Object.keys(events).includes(event)) {
    event = "none";
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });

  const drive = google.drive({ version: 'v3', auth });

  try {
    const folderId = events[event as keyof typeof events].driveId;
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/'`,
      fields: 'files(id, name, mimeType)',
    });

    const files = response.data.files;

    const imageUrls = files?.map((file) => ({
      id: file.id,
      name: file.name,
      url: `/api/getImage?fileId=${file.id}`,
    }));

    return Response.json({
      images: imageUrls,
      eventData: events[event as keyof typeof events]
    });
  } catch (error: any) {
    console.error('Error fetching files:', error.message);
    return Response.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
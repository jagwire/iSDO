//
//  EmailComposer.m
// 
//
//  Created by Jesse MacFadyen on 10-04-05.
//  Copyright 2010 Nitobi. All rights reserved.
//

#import "EmailComposer.h"


@implementation EmailComposer


- (void) showEmailComposer:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{	
	// NSUInteger argc = [arguments count];
	NSLog(@"Opening Email window!");
	NSString* toRecipientsString = [options valueForKey:@"toRecipients"];
	NSString* ccRecipientsString = [options valueForKey:@"ccRecipients"];
	NSString* bccRecipientsString = [options valueForKey:@"bccRecipients"];
	NSString* subject = [options valueForKey:@"subject"];
	NSString* body = [options valueForKey:@"body"];
	NSString* isHTML = [options valueForKey:@"bIsHTML"];
    NSString* attachmentData = [options valueForKey:@"data"];
	//NSString* msg = @"Filename: ";
    
    NSArray *keys;
    int i, count;
    id key, value;
    keys = [options allKeys];
    count = [keys count];
    
    for(i = 0; i < count; i++) {
        key = [keys objectAtIndex: i];
        value = [options objectForKey: key];
        NSLog (@"Key: %@ for value: %@", key, value);
    }
 
    //NSLog([msg stringByAppendingString: fileName]);
    MFMailComposeViewController *picker = [[MFMailComposeViewController alloc] init];
    picker.mailComposeDelegate = self;
    
	// Set subject
	if(subject != nil)
		[picker setSubject:subject];
	// set body
	if(body != nil)
	{
		if(isHTML != nil && [isHTML boolValue])
		{
			[picker setMessageBody:body isHTML:YES];
		}
		else
		{
			[picker setMessageBody:body isHTML:NO];
		}
	}
	
	// Set recipients
	if(toRecipientsString != nil)
	{
		[picker setToRecipients:[ toRecipientsString componentsSeparatedByString:@","]];
	}
	if(ccRecipientsString != nil)
	{
		[picker setCcRecipients:[ ccRecipientsString componentsSeparatedByString:@","]]; 
	}
	if(bccRecipientsString != nil)
	{
		[picker setBccRecipients:[ bccRecipientsString componentsSeparatedByString:@","]];
	}
    if(attachmentData != nil) {
        NSLog(@"Trying to attach file!");
        NSString *path = [[NSBundle mainBundle] pathForResource:@"data" ofType:@"csv"];
        NSData *data = [attachmentData dataUsingEncoding:NSUTF8StringEncoding];
        
        
        [picker addAttachmentData:data mimeType:@"text/csv" fileName:@"data" ];
    }
	
    // Attach an image to the email
	// NSString *path = [[NSBundle mainBundle] pathForResource:@"rainy" ofType:@"png"];
	//  NSData *myData = [NSData dataWithContentsOfFile:path];
	//  [picker addAttachmentData:myData mimeType:@"image/png" fileName:@"rainy"];
    
    
    
    if (picker != nil) {  	
        [self.viewController presentModalViewController:picker animated:YES];
    }
    [picker release];
}


// Dismisses the email composition interface when users tap Cancel or Send. Proceeds to update the message field with the result of the operation.
- (void)mailComposeController:(MFMailComposeViewController*)controller didFinishWithResult:(MFMailComposeResult)result error:(NSError*)error 
{   
    // Notifies users about errors associated with the interface
	int webviewResult = 0;
	
    switch (result)
    {
        case MFMailComposeResultCancelled:
			webviewResult = 0;
            break;
        case MFMailComposeResultSaved:
			webviewResult = 1;
            break;
        case MFMailComposeResultSent:
			webviewResult =2;
            break;
        case MFMailComposeResultFailed:
            webviewResult = 3;
            break;
        default:
			webviewResult = 4;
            break;
    }
	
    [self.viewController dismissModalViewControllerAnimated:YES];
	
	NSString* jsString = [[NSString alloc] initWithFormat:@"window.plugins.emailComposer._didFinishWithResult(%d);",webviewResult];
	[self writeJavascript:jsString];
	[jsString release];
	
}

@end
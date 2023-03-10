CREATE PROC [dbo].[NewsletterContent_Insert]
			@NewsletterId int
			,@TemplateKeyId int
			,@Value nvarchar(4000)
			,@CreatedBy int
			,@Id int OUTPUT

AS

/* <--- TEST CODE INSERT --->

DECLARE @Id int = 0;

DECLARE  @NewsletterId int = 1
		,@TemplateKeyId int = 1
		,@Value nvarchar(4000) = 'tesgin'
		,@CreatedBy int = 1


EXECUTE dbo.NewsletterContent_Insert
			@NewsletterId
			,@TemplateKeyId
			,@Value
			,@CreatedBy
			,@Id OUTPUT

SELECT *
	FROM dbo.NewsletterContent
	Where Id = @Id

   <--- TEST CODE INSERT ---> */

BEGIN


INSERT INTO dbo.NewsletterContent
			(
				 [NewsletterId]
				,[TemplateKeyId]
				,[Value]
				,[CreatedBy]
								)

VALUES
			(
				 @NewsletterId
				,@TemplateKeyId
				,@Value
				,@CreatedBy
								)

				SET @Id = SCOPE_IDENTITY()

END
GO

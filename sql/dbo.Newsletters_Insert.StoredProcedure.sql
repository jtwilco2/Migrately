CREATE PROC [dbo].[Newsletters_Insert]
			@TemplateId int
			,@Name nvarchar(100)
			,@CoverPhoto nvarchar(255)
			,@DateToPublish datetime2(7)
			,@DateToExpire datetime2(7)
			,@CreatedBy int
			,@Id int OUTPUT

AS

/* <--- TEST CODE INSERT --->

DECLARE @Id int = 0;

DECLARE  @TemplateId int = 1
		,@Name nvarchar(100) = 'template 1'
		,@CoverPhoto nvarchar(255) = 'coverphoto 1'
		,@DateToPublish datetime2(7) = '2023-3-1 12:00:00'
		,@DateToExpire datetime2(7) = '2023-3-8 12:00:00'
		,@CreatedBy int = 1


EXECUTE dbo.Newsletters_Insert
			@TemplateId
			,@Name
			,@CoverPhoto
			,@DateToPublish
			,@DateToExpire
			,@CreatedBy 
			,@Id

SELECT *
	FROM dbo.Newsletters
	Where Id = @Id

   <--- TEST CODE INSERT ---> */

BEGIN


INSERT INTO dbo.Newsletters
			(
				 [TemplateId]
				,[Name]
				,[CoverPhoto]
				,[DateToPublish]
				,[DateToExpire]
				,[CreatedBy]
								)

VALUES
			(
				@TemplateId
				,@Name
				,@CoverPhoto
				,@DateToPublish
				,@DateToExpire
				,@CreatedBy
								)

				SET @Id = SCOPE_IDENTITY()

END
GO

CREATE proc [dbo].[PageSection_Insert]
		@PageTranslationId int
		,@Section nvarchar(100)
		,@Component nvarchar(100)
		,@Id int OUTPUT

as

/* -----------Test Code---------------
Declare @Id int = 0;

Declare @PageTranslationId int = 1
		,@Section nvarchar(100) = 'Something'
		,@Component nvarchar(100) = 'Something'

Execute dbo.PageSection_Insert	@PageTranslationId
								,@Name
								,@Component
								,@Id OUTPUT

		Select @Id

		Select *
		From dbo.PageSection
		Where Id = @Id

------------------------------------*/

BEGIN

INSERT INTO [dbo].[PageSection]
           ([PageTranslationId]
           ,[Section]
           ,[Component])
     VALUES
           (@PageTranslationId
           ,@Section
           ,@Component)

		Set @Id = SCOPE_IDENTITY()
END


GO

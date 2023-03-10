CREATE proc [dbo].[PageTranslations_Insert]
		@LanguageId int
		,@Link nvarchar(255)
		,@Name nvarchar(100)
		,@CreatedBy int
		,@Id int OUTPUT

as

/* -----------Test Code---------------
Declare @Id int = 0;

Declare @LanguageId int = 200
		,@Link nvarchar(255) = 'Landing'
		,@Name nvarchar(100) = 'Landing'
		,@CreatedBy int = 1

Execute dbo.PageTranslations_Insert	@LanguageId 
									,@Link 
									,@Name 
									,@CreatedBy 
									,@Id OUTPUT

		Select @Id

		Select *
		From dbo.PageTranslations
		Where Id = @Id

------------------------------------*/

BEGIN

IF NOT EXISTS (
SELECT  LanguageId
	   ,Link
FROM dbo.PageTranslations
WHERE @LanguageId = LanguageId AND @Link = Link AND @Name = Name)

INSERT INTO [dbo].[PageTranslations]
           ([LanguageId]
           ,[Link]
           ,[Name]
           ,[CreatedBy])
    
	VALUES
           (@LanguageId
           ,@Link
           ,@Name
           ,@CreatedBy)

	Set @Id = SCOPE_IDENTITY()

END
GO

CREATE proc [dbo].[PageTranslations_Update]
	@LanguageId int
	,@Link nvarchar(255)
	,@Name nvarchar(100)
	,@Id int

as

/* -----------Test Code---------------
Declare @Id int = 3;

Declare @LanguageId int = 1
		,@Link nvarchar(255) = 'Something14'
		,@Name nvarchar(100) = 'Something'
		

		Select *
		From dbo.PageTranslations
		Where Id = @Id

Execute dbo.PageTranslations_Update	@LanguageId
									,@Link
									,@Name
									,@Id


		Select *
		From dbo.PageTranslations
		Where Id = @Id

------------------------------------*/

BEGIN

Declare @dateNow datetime2 = getutcdate();

UPDATE [dbo].[PageTranslations]
   SET [LanguageId] = @LanguageId
      ,[Link] = @Link
      ,[Name] = @Name
      ,[DateModified] = @dateNow
 WHERE Id = @Id

END


GO
